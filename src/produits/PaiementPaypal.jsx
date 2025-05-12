import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaiementPaypal.css';

function PaiementPaypal() {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += parseFloat(item.product.price) * item.quantity;
    });
    setTotal(totalPrice.toFixed(2));
  }, []);

  const handleApprove = async (details) => {
    alert(` Paiement réussi, merci ${details.payer.name.given_name}`);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!token || !user?.id) {
      alert(" Vous devez être connecté pour valider la commande.");
      navigate('/login');
      return;
    }

    const payload = {
      items: cart,
      total: total,
      transaction_id: details.id,
      user_id: user.id
    };

    console.log(" Données envoyées à l'API:", payload);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/payment/paypal/success',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("Réponse du backend:", response.data);
      alert(" Commande enregistrée avec succès !");
      localStorage.removeItem('cartItems');
      navigate('/confirmation');

    } catch (error) {
      console.error(" Erreur Axios:", error.response?.data || error.message);
      alert(" Erreur lors de l'enregistrement de la commande.");
    }
  };

  return (
    <div className="payment-paypal-container">
      <h3>Paiement via PayPal</h3>

      <div className="paypal-summary">
        <strong>Total à payer:</strong> {total} DH
      </div>

      <div className="paypal-wrapper">
        <div className="paypal-buttons-container">
          <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{ amount: { value: total } }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(handleApprove);
            }}
            onCancel={() => alert('Paiement annulé')}
            onError={(err) => {
              console.error("Erreur PayPal:", err);
              alert("Une erreur est survenue avec PayPal.");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PaiementPaypal;
