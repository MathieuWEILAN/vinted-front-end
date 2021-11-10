import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import banner from "../img/banner-vinted.jpg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);

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
              item.product_pictures.length > 0 && (
                <Link to={`/offer/${item._id}`} className="link">
                  <div key={item._id} className="item">
                    {item.product_pictures.length > 1 ? (
                      <img
                        src={item.product_pictures[0].url}
                        alt=""
                        className="img-item"
                      />
                    ) : (
                      <div>
                        {item.product_pictures.map((picture, i) => {
                          return (
                            <img
                              src={item.product_pictures[0].url}
                              alt=""
                              className="img-item"
                            />
                          );
                        })}
                      </div>
                    )}
                    <div className="price">{item.product_price}€</div>
                    <div className="details">{item.product_name}</div>

                    <div className="details">
                      {item.product_details.map((details, i) => {
                        return <div>{details.TAILLE}</div>;
                      })}
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
