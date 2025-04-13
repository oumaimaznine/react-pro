import React, { useState } from 'react';
import './PagePannier.css';
import { useNavigate } from 'react-router-dom';

// Exemple de données pour les produits du panier
const sampleCartItems = [
  { id: 1, name: 'Croquettes pour chien', price: 20, quantity: 2, image: '/cro.jpg' },
  { id: 2, name: 'Jouet pour chat', price: 70, quantity: 1, image: '/jouetchat.jpg' },
  { id: 3, name: 'Collier pour chien', price: 100, quantity: 3, image: '/colier.jpg' },
];

const PagePannier = () => {
  const navigate = useNavigate();

  // État local pour le panier et les frais de livraison
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [shippingCost] = useState(5); // Exemple de frais de livraison (lecture seule)

  // Calculer le prix total
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id); // Ne pas permettre une quantité < 1
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    ));
  };

  // Supprimer un produit du panier
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculer le total (prix total + frais de livraison)
  const totalPrice = getTotalPrice() + shippingCost;

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h2>Résumé de votre panier</h2>
        {cartItems.length === 0 ? (
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
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Prix: {item.price}DH</p>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p>Total: {item.price * item.quantity}DH</p>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <p>Prix total: {getTotalPrice()}DH</p>
              <p>Frais de livraison: {shippingCost}DH</p>
              <p>Total à payer: {totalPrice}DH</p>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Passer à la caisse
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PagePannier;
