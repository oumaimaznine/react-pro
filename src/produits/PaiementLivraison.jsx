import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaiementLivraison.css';

function PaiementLivraison() {
  const [userAddress, setUserAddress] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/address', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserAddress(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement de l’adresse:', error);
      }
    };

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += parseFloat(item.product.price) * item.quantity;
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
          total: total,
          items: cartItems,
          shipping_address: `${userAddress.address}, ${userAddress.city}`,
          payment_method: 'Paiement à la livraison'
        };
        console.log('Payload envoyé :', payload);
        await axios.post('http://127.0.0.1:8000/api/payment/cod', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Commande en livraison enregistrée !');
       
      } catch (error) {
        console.error('Erreur lors de l’enregistrement :', error.response?.data || error.message);
      }
    };

    if (userAddress.address && userAddress.city) {
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
        <p><strong>Adresse de livraison :</strong> {userAddress.address}, {userAddress.city}</p>
        <p><strong>Date estimée de livraison :</strong> entre 2 et 4 jours ouvrables</p>
      </div>

      <div className="btns-livraison">
        <a className="btn-secondary" href="/confirmation">Suivre ma commande</a>
      </div>
    </div>
  );
}

export default PaiementLivraison;
