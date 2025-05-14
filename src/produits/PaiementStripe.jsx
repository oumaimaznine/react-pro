import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PaiementStripe.css";

const stripePromise = loadStripe("pk_test_51ROfS92eggJY7CwO3QJrelFVFNGlMECpFbRJBqiRoHYLMZTUgnpVILCkIn1ebnDdmKP40Y62aKpoAA31vXYSV8A600Bx9uY8S7");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
    const total = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalPrice(total.toFixed(2));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (cartItems.length === 0 || totalPrice <= 0) {
      setMessage("Panier vide ou montant invalide !");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/payment/stripe", {
        amount: Math.round(totalPrice * 100),
      });

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        setMessage("❌ " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Paiement réussi !");

        const token = localStorage.getItem("token");

        await axios.post("http://localhost:8000/api/payment/stripe/success", {
          items: cartItems,
          total: totalPrice,
          transaction_id: result.paymentIntent.id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
      

        localStorage.removeItem("cartItems");
        setTimeout(() => navigate("/confirmation"), 2000);
      }
    } catch (error) {
      setMessage("Erreur serveur: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Paiement par carte</h2>
      <div className="payment-icons">
        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
        <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="MasterCard" />
        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" />
        <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" />
      </div>

      <label>Numéro De Carte *</label>
      <div className="card-element-box">
        <CardNumberElement />
      </div>

      <label>Date d'expiration *</label>
      <div className="card-element-box">
        <CardExpiryElement />
      </div>

      <label>Code de sécurité *</label>
      <div className="card-element-box">
        <CardCvcElement />
      </div>

      <div className="btn-center">
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Traitement..." : `Payer ${totalPrice} MAD`}
        </button>
      </div>

      {message && <div className="payment-message">{message}</div>}
    </form>
  );
};

export default function PaiementStripe() {
  return (
    <div className="paiement-stripe-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
