import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51JwRNdHRa7Zdg2IaIYXbFK2Nj4YjIzzrGfl2gasjVWEqERhTbzsPbNdyG4PKiQOKMdgznJKHBvsymSWN37HN3ujw000ypOhEQ3"
);

const Payment = () => {
  const location = useLocation();

  const { title, price, idBuyer } = location.state;
  console.log(idBuyer);
  const shippingFees = 1.0;
  const protectionBuyers = 0.5;
  const total = (price + shippingFees + protectionBuyers).toFixed(2);

  return (
    <div>
      <div className="container-payment">
        <div>Résumé de la commande</div>
        <div>
          <div className="payment">
            <span>Commande</span>
            <span>{price} €</span>
          </div>
          <div className="payment">
            <span>Frais protection acheteur</span>
            <span>{protectionBuyers} €</span>
          </div>
          <div className="payment">
            <span>Frais de port</span>
            <span>{shippingFees} €</span>
          </div>
        </div>
        <div className="total-pay">
          <span>Total</span>
          <span>{total} €</span>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} title={title} idBuyer={idBuyer} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
