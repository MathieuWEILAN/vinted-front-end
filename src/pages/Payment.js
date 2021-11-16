import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JwRNdHRa7Zdg2IaIYXbFK2Nj4YjIzzrGfl2gasjVWEqERhTbzsPbNdyG4PKiQOKMdgznJKHBvsymSWN37HN3ujw000ypOhEQ3"
);

const Payment = () => {
  return (
    <div>
      <div>
        <div>Résumé de la commande</div>
        <div>
          <div>
            <span>Commande</span>
            <span>prix €</span>
          </div>
          <div>
            <span>Frais protection acheteur</span>
            <span>prix €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>prix €</span>
          </div>
        </div>
        <div>
          <span>Total</span>
          <span>prix €</span>
        </div>
        <div>
          Il ne vous reste plus qu'un étape pour vous offrir Azuka shirt. Vous
          allez payer 6.5 € (frais de protection et frais de port inclus).
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <button>Payer</button>
    </div>
  );
};

export default Payment;
