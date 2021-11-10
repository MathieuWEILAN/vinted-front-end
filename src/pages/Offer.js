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
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        console.log(response.data.offers);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  console.log("my product id ", productId);

  const myItem = data.offers.find((el) => el._id === productId);

  return isLoading ? (
    <span>is Loading</span>
  ) : (
    <div>
      {myItem.product_pictures.map((picture, i) => {
        return <img key={i} src={picture.url} alt="" />;
      })}
      <div>
        <div>
          <div>{myItem.product_price}</div>
          <div>
            {myItem.product_details.map((detail, i) => {
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
          <div></div>
          <div></div>
          <div></div>
        </div>
        <button>Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
