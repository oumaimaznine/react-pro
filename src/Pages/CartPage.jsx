import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error.response?.data || error.message);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/cart/items/${itemId}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error.response?.data || error.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error.response?.data || error.message);

    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Panier vide"
          className="cart-icon"
        />
        <h3>Votre panier est vide !</h3>
        <p>Parcourez nos catégories et découvrez nos meilleures offres !</p>
        <button
          className="start-shopping-btn"
          onClick={() => navigate('/produits')}
        >
          Commencez vos achats
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Votre panier</h2>
      <div className="cart-header">
        <div>Produit</div>
        <div>Quantité</div>
        <div>Total</div>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="product-info">
              <div className="image-wrapper">
                <img
                  src={
                    item.product.images && item.product.images.length > 0
                      ? `http://127.0.0.1:8000/${item.product.images[0].url}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={item.product.name}
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <h3>{item.product.name}</h3>
                <p className="small-price">{parseFloat(item.product.price).toFixed(2)} dhs</p>
                {item.product.size && (
                  <p className="product-size">Taille: {item.product.size}</p>
                )}
              </div>
            </div>

            <div className="cart-quantity-column">
  <div className="quantity-control">
    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
    <span>{item.quantity}</span>
    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
  </div>
  <button onClick={() => handleRemoveItem(item.id)} className="delete-btn">🗑️</button>
</div>


            <div className="total-price">
              {(parseFloat(item.product.price) * item.quantity).toFixed(2)} dhs
            </div>
          </div>
        ))}
      </div>

    
      <div className="cart-footer">
  <div className="footer-total-line">
    Total estimé : <span>{totalPrice.toFixed(2)} Dhs</span>
  </div>
  <p className="footer-note">Taxes, réductions et frais d’expédition calculés à l’étape du paiement.</p>
  <Link to="/checkout">
    <button className="checkout-button">Procéder au paiement</button>
  </Link>
</div>


    </div>
  );
}

export default CartPage;
