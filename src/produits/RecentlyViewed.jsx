import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecommendedProducts.css'; 

const RecentlyViewed = ({ title = "Produits récemment consultés" }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    if (viewedIds.length > 0) {
      axios.get(`${process.env.REACT_APP_API_URL}/viewed-products`, {
        params: { ids: viewedIds }
      })
      .then(res => {
        setRecentlyViewed(res.data.recently_viewed || []);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des produits récemment consultés:", err);
      });
    }
  }, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (recentlyViewed.length === 0) {
    return (
      <div className="recommended-container">
        <h3 className="recommend-title">{title}</h3>
        <p>Aucun produit consulté récemment.</p>
      </div>
    );
  }

  return (
    <div className="recommended-container">
      <h3 className="recommend-title">{title}</h3>
      <div className="recommended-list">
        {recentlyViewed.map(product => (
          <div
            key={product.id}
            className="recommended-card"
            onClick={() => handleClick(product.id)}
          >
            <img
              loading="lazy"
              src={`${process.env.REACT_APP_IMAGE_URL}/${product.images?.[0]?.url}`}
              alt={product.name}
            />
            {product.is_promo === 1 && (
              <span className="promo-label">Promotion</span>
            )}
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
  );
};

export default RecentlyViewed;
