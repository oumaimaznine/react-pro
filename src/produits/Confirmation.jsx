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
       

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      
        setOrders(response.data);
        
      } catch (error) {
    
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading">Chargement des commandes...</p>;

  return (
    <div className="page-full-height">
      <div className="orders-container">
      <h2 className="orders-title">Mes Commandes</h2>

        {orders.length === 0 ? (
           <div className="empty-orders">
           <p>Aucune commande trouvée.</p>
         </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
              <div className="order-header">
  <p><strong>Commande N°:</strong> {order.id}</p>
  <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
</div>

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
                  {item.product?.name} — {item.quantity} x {Number(item.variant?.price ?? item.price ?? item.product?.price ?? 0).toFixed(2)} MAD
                </li>
                
               
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Confirmation;
