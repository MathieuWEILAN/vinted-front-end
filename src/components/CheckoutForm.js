import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ total, title, idBuyer }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // on récupèrer les données bancaires que user entre
      const cardElements = elements.getElement(CardElement);

      // demande de création d'un token de l'API stripe
      // envoie des données bancaires dans la requete

      const stripeResponse = await stripe.createToken(cardElements, {
        name: idBuyer,
      });
      console.log("stripe response", stripeResponse);
      // réception du token de l'API
      const stripeToken = stripeResponse.token.id;
      // Requete vers le serveur et envoie du token
      console.log("stripe token", stripeToken);
      const response = await axios.post("http://localhost:4000/pay", {
        stripeToken: stripeToken,
        total: total,
        title: title,
        idBuyer: idBuyer,
      });

      console.log(response.data);
      // réponse du serveur, si la transaction à bien eu lieu
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !completed ? (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Valider</button>
      </form>
    </div>
  ) : (
    <div>
      <div>Paiement accepté</div>
      <button>retour à l'accueil</button>
    </div>
  );
};

export default CheckoutForm;
