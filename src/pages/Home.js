import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import banner from "../img/banner-vinted.jpg";
import wide from "../img/banner_wide.jpg";
import Cookies from "js-cookie";

const Home = ({ search, checked, prices }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let response = await axios.get(
        //   `https://my-first-backend-project.herokuapp.com/offers`
        // );
        const title = search ? `title=${search}` : "";
        const priceMinimum = `priceMin=${prices[0]}`;
        const priceMaximum = `priceMax=${prices[1]}`;
        const pageOffer = `page=${page}`;

        const response = await axios.get(
          `https://my-first-backend-project.herokuapp.com/offers?${title}&${priceMinimum}&${priceMaximum}&${checked}&${pageOffer}`
        );
        console.log(response.data);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, checked, prices, page]);

  const navigate = useNavigate();

  const handlePageAdd = () => {
    if (data.offers.length > 1) {
      return setPage(page + 1);
    }
  };

  const handlePageBack = () => {
    if (page > 1) {
      return setPage(page - 1);
    }
  };

  const handleClick = () => {
    if (Cookies.get("token")) {
      navigate("/publish");
    } else {
      navigate("/login");
    }
  };

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
              <button className="btn-right bann" onClick={handleClick}>
                Commencez à vendre
              </button>
            </div>
          </div>
        </div>
        <div className="container-home">
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
                        return <div>{details.size}</div>;
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="pagination">
            <button className="page-btn" onClick={handlePageBack}>
              &laquo;
            </button>
            <div>{page}</div>
            {data.offers.length > 1 && (
              <button className="page-btn" onClick={handlePageAdd}>
                &raquo;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
