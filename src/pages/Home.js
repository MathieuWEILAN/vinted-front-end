import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import banner from "../img/banner-vinted.jpg";
import wide from "../img/banner_wide.jpg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-first-backend-project.herokuapp.com/offers"
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div class="cs-loader">
      <div class="cs-loader-inner">
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
        <label>●</label>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <div className="banner">
          <img
            src="https://www.vinted.fr/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
            alt=""
            className="banner-wide"
          />
          <div>
            <div className="banner-ready">
              Prêt à faire du tri dans vos placards ?
              <button className="btn-right bann">Commencez à vendre</button>
            </div>
          </div>
        </div>

        <div className="products">
          {data.offers.map((item, i) => {
            return (
              <Link to={`/offer/${item._id}`} className="link">
                <div key={item._id} className="item">
                  <img src={item.product_image} alt="" className="img-item" />
                  <div className="price">{item.product_price}€</div>
                  <div className="details">{item.product_name}</div>

                  <div className="details">
                    {item.product_details.map((details, i) => {
                      return <div>{details.TAILLE}</div>;
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
