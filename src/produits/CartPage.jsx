import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import Loader from '../components/Loader';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const firstProductId = cartItems.length > 0 ? cartItems[0].product.id : null;

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
  
      //  Redirige si l'utilisateur n'est pas connecté
      if (!token) {
        navigate('/connexion');
        return;
      }
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
        localStorage.setItem('cartItems', JSON.stringify(response.data));
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);
  
  useEffect(() => {
    if (firstProductId && cartItems.length > 0) {
      const timeout = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [firstProductId, cartItems]);
  
  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    const token = localStorage.getItem('token');

    if (!token) {
      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems.map((item) => ({
          ...item.product,
          variant: item.variant,
          quantity: item.quantity
        })))
      );
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/cart/items/${itemId}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      
    }
  };

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem(
        'cart',
        JSON.stringify(updatedItems.map((item) => ({
          ...item.product,
          variant: item.variant,
          quantity: item.quantity
        })))
      );
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cart/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    } catch (error) {
      
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const unitPrice = item.variant?.price ?? item.price ?? item.product.price ?? 0;
    return total + parseFloat(unitPrice) * item.quantity;
  }, 0);
  
  

  if (loading) {
    return (
      <div className="page-full-height">
        <Loader />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-full-height empty-cart">
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
    <div className="page-full-height">
      <div className="cart-container">
        <h2>Votre panier</h2>

        <div className="cart-header">
          <div>Produit</div>
          <div>Quantité</div>
          <div>Total</div>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => {
        const unitPrice = item.variant?.price ?? item.price ?? item.product.price ?? 0;




            return (
              <div key={item.id} className="cart-item">
                <div className="product-info">
                  <div className="image-wrapper">
                  <img
  src={item.image_url || 'https://via.placeholder.com/150'}
  alt={item.product.name}
  className="product-image"
/>





                  </div>
                  <div className="product-details">
                    <h3>{item.product.name}</h3>
                    <p className="small-price">{parseFloat(unitPrice).toFixed(2)} dhs</p>
                    {item.selected_size && <p>Taille: {item.selected_size}</p>}

                    {item.selected_color && <p>Couleur: {item.selected_color}</p>}

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
                  {(parseFloat(unitPrice) * item.quantity).toFixed(2)} dhs
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-footer">
          <div className="footer-total-line">
            Total estimé : <span>{totalPrice.toFixed(2)} Dhs</span>
          </div>
          <Link to="/orders">
            <button className="checkout-button">Commander</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
