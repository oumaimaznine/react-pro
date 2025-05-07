import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Confirmation.css';

function MesCommandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="orders-container">
      <h2>Mes Commandes</h2>

      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Commande N°:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Total:</strong> {order.total} DH</p>
            <p><strong>Statut:</strong> {order.status}</p>

            <div className="order-items">
              <strong>Produits :</strong>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.name} — {item.quantity} x {item.unit_price} DH
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

export default MesCommandes;
