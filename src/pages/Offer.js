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
  ) : (
    <div>
      {data.product_pictures.map((picture, i) => {
        return <img key={i} src={picture.url} alt="" />;
      })}
      <div>
        <div>
          <div>{data.product_price}</div>
          <div>
            {data.product_details.map((detail, i) => {
              return (
                <div key={i}>
                  <div>{detail.MARQUE}</div>
                  <div>{detail.TAILLE}</div>
                  <div>{detail.ETAT}</div>
                  <div>{detail.COULEUR}</div>
                  <div>{detail.EPLACEMENT}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {" "}
          <div>{data.product_name}</div>
          <div>{data.product_description}</div>
          <div>
            {/* <img src="" alt="" /> */}
            <div>{data.owner.account.username}</div>
          </div>
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
