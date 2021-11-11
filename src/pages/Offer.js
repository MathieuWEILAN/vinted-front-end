import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${productId}`
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
  ) : data.product_pictures.length < 2 ? (
    <div className="offer-page red">
      {data.product_pictures.map((picture, i) => {
        return (
          <img key={i} src={picture.url} alt="" className="offer-picture" />
        );
      })}
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
            {/* <img src="" alt="" /> */}
            <div className="username">{data.owner.account.username}</div>
          </div>
        </div>
        <button className="btn-right">Acheter</button>
      </div>
    </div>
  ) : (
    <div className="container-offer">
      <div className="offer-page-1">
        {data.product_pictures.map((picture, i) => {
          return (
            <img
              key={i}
              src={picture.url}
              alt=""
              className="offer-multiple-picture"
            />
          );
        })}
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
              {/* <img src="" alt="" /> */}
              <div className="username">{data.owner.account.username}</div>
            </div>
          </div>
          <button className="btn-right">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
