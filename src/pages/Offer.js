import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/offer/${productId}`
        );
        console.log("data ", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const onClick = () => {
    if (Cookies.get(token)) {
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
    <div className="offer-page">
      <img src={data.product_image} alt="" className="offer-picture" />
      <div className="offer-infos">
        <div>
          <div className="offer-price">{data.product_price}€</div>
          <div>
            {data.product_details.map((detail, i) => {
              const keys = Object.keys(detail);
              return (
                <div key={i}>
                  {[keys[0]] && (
                    <div className="infos-details">
                      <span className="grey">{keys[0]}</span>{" "}
                      <span>{detail[keys[0]]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="offer-infos-2">
          <div>{data.product_name}</div>
          <div>{data.product_description}</div>
          <div>
            <div className="username">{data.owner.account.username}</div>
          </div>
        </div>
        <button className="btn-right">Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
