import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import RecommendedProducts from './RecommendedProducts';
import Loader from '../components/Loader';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const firstProductId = cartItems.length > 0 ? cartItems[0].product.id : null;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(response.data);
        localStorage.setItem('cartItems', JSON.stringify(response.data));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error.response?.data || error.message);
      } finally {
        setLoading(false); // fin du chargement
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/items/${itemId}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error.response?.data || error.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error.response?.data || error.message);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  if (loading) {
    return <Loader />;
  }

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
        <button className="start-shopping-btn" onClick={() => navigate('/')}>
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
                      ? `${process.env.REACT_APP_API_URL}/${item.product.images[0].url}`
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

        <Link to="/orders">
          <button className="checkout-button">Commander</button>
        </Link>
      </div>

      {/* Recommandations */}
      {firstProductId && (
        <RecommendedProducts
          productId={firstProductId}
          cartItems={cartItems}
          title="Vous pourriez le remplir avec"
        />
      )}
    </div>
  );
}

export default CartPage;
