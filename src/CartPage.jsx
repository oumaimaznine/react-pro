import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/cart/items/${itemId}`, {
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchCart(); // Recharger panier
    } catch (error) {
      console.error('Erreur update quantity:', error);
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchCart(); // Recharger panier
    } catch (error) {
      console.error('Erreur remove item:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <p>Chargement du panier...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>

      {cart.items.map((item) => (
        <div key={item.id} className="cart-item">
          <h4>{item.product.name}</h4>
          <p>Prix: {item.product.price} MAD</p>
          <p>Quantité: {item.quantity}</p>

          <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>➕</button>
          <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>➖</button>
          <button onClick={() => removeCartItem(item.id)}>🗑️ Supprimer</button>
        </div>
      ))}

    </div>
  );
}

export default CartPage;
