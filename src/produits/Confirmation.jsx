import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Confirmation.css';

function Confirmation() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🧪 Token:', token);
        const response = await axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(' Commandes reçues:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error(' Erreur lors du chargement des commandes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Chargement des commandes...</p>;

  return (
    <div className="orders-container">
      <h2>Mes Commandes</h2>

      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span><strong>Commande N°:</strong> {order.id}</span>
              <span><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="order-body">
              <p><strong>Total:</strong> {order.total} MAD</p>
              <p><strong>Statut:</strong> {order.status}</p>
              <p><strong>Méthode de paiement:</strong> {order.payment_method || 'Non spécifiée'}</p>
              <p><strong>Adresse livraison:</strong> {order.shipping_address}</p>
            </div>

            <div className="order-items">
              <strong>Produits :</strong>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product?.name} — {item.quantity} x {item.price} MAD
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Confirmation;
