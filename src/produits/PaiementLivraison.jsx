import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaiementLivraison.css';
import { Link } from 'react-router-dom';

function PaiementLivraison() {
  const [userAddress, setUserAddress] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserAddress(response.data);
      } catch (error) {
       
      }
    };

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
      const unitPrice = item.variant?.price ?? item.price ?? item.product.price ?? 0;
      totalPrice += parseFloat(unitPrice) * item.quantity;
    });

    setTotal(totalPrice);
    fetchAddress();
  }, []);

  useEffect(() => {
    const envoyerCommande = async () => {
      try {
        const token = localStorage.getItem('token');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const payload = {
          adresse: userAddress.address,
          phone: userAddress.phone,
          ville: userAddress.city,
          code_postal: userAddress.postal_code,
          region: userAddress.region,
          country: userAddress.country,
          total: total,
          payment_method: 'cod',
          items: cartItems
        };

       

        await axios.post(`${process.env.REACT_APP_API_URL}/orders`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

      } catch (error) {
  
      }
    };

    if (
      userAddress.address &&
      userAddress.city &&
      userAddress.postal_code &&
      userAddress.region &&
      userAddress.country &&
      userAddress.phone
    ) {
      envoyerCommande();
    }
  }, [userAddress, total]);

  return (
    <div className="livraison-page">
      <h2>Commande confirmée</h2>
      <p>Merci pour votre confiance. Votre commande a bien été enregistrée.</p>

      <div className="commande-details">
        <p><strong>Mode de paiement :</strong> Paiement à la livraison</p>
        <p><strong>Total :</strong> {total.toFixed(2)} MAD</p>
        <p><strong>Adresse de livraison :</strong> {userAddress.address}, {userAddress.city}, {userAddress.postal_code}, {userAddress.region}, {userAddress.country}, {userAddress.phone}</p>
        <p><strong>Date estimée de livraison :</strong> entre 2 et 4 jours ouvrables</p>
      </div>

      <div className="btns-livraison">
        <Link to="/confirmation" className="btn-secondary">Suivre ma commande</Link>
      </div>
    </div>
  );
}

export default PaiementLivraison;
