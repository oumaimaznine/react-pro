import React from 'react';
import './CartPage.css';

const CartPage = () => {
  return (
    <div className="empty-cart-container">
      <div className="cart-content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Panier vide"
          className="cart-icon"
        />
        <h2>Votre panier est vide!</h2>
        <p>Parcourez nos catégories et découvrez nos meilleures offres!</p>
        <button className="start-shopping-btn">Commencez vos achats</button>
      </div>
    </div>
  );
};

export default CartPage;
