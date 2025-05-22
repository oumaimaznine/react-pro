import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecommendedProducts.css';

const RecommendedProducts = ({ productId, cartItems = [], title = "Articles recommandés pour vous" }) => {
  const [sameCategory, setSameCategory] = useState([]);
  const [alsoBought, setAlsoBought] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    axios.get(`${process.env.REACT_APP_API_URL}/api/recommendations/${productId}`)

      .then((res) => {
        setSameCategory(res.data.same_category || []);
        setAlsoBought(res.data.also_bought || []);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des recommandations:', err);
      });
  }, [productId]);

  // Récupérer les IDs des produits déjà dans le panier
  const cartProductIds = cartItems.map(item => item.product.id);

  // Fusionner les deux listes et supprimer les doublons + produits du panier
  const mergedList = [...sameCategory, ...alsoBought].filter((product, index, self) =>
    !cartProductIds.includes(product.id) &&
    index === self.findIndex(p => p.id === product.id)
  );

  const handleClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    mergedList.length > 0 && (
      <div className="recommended-container">
        <h3 className="recommend-title">{title}</h3>
        <div className="recommended-list">
          {mergedList.map((product) => (
            <div
              key={product.id}
              className="recommended-card"
              onClick={() => handleClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
   {product.is_promo === 1 && (
  <span className="promo-label">Promotion</span>
)}

<img
  src={`${process.env.REACT_APP_API_URL}/${product.images?.[0]?.url}`}
  alt={product.name}
/>

<p className="product-name">{product.name}</p>

<div className="price">
  {product.is_promo === 1 && product.old_price && (
    <span className="old-price">{parseFloat(product.old_price).toFixed(2)} Dhs</span>
  )}
  <span className="new-price">{parseFloat(product.price).toFixed(2)} Dhs</span>
</div>

            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedProducts;
