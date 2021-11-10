import { useState, useEffect } from "react";
import axios from "axios";

const Offer = (productId) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const exist = data.offers.find((elem) => elem._id === productId);
  console.log(exist);

  console.log("my product id ", productId, data);

  return isLoading ? <span>is Loading</span> : <div>ok</div>;
};

export default Offer;
