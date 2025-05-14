import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RecommendedProducts.css';

const RecommendedProducts = ({ productId }) => {
  const [alsoBought, setAlsoBought] = useState([]);
  const [sameCategory, setSameCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    axios.get(`http://localhost:8000/api/recommendations/${productId}`)
      .then((res) => {
        setAlsoBought(res.data.also_bought || []);
        setSameCategory(res.data.same_category || []);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des recommandations:', err);
      });
  }, [productId]);

  const produitsAfficher = alsoBought.length > 0 ? alsoBought : sameCategory;

 
  const handleClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="recommended-container">
      <h3 className="recommend-title">
        Les clients ayant consulté cet article ont également regardé
      </h3>
      <div className="recommended-list">
        {produitsAfficher.map((product) => (
          <div
            key={product.id}
            className="recommended-card"
            onClick={() => handleClick(product.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`http://127.0.0.1:8000/${product.images?.[0]?.url}`}
              alt={product.name}
            />
            <p>{product.name}</p>
            <p className="price">{product.price} Dh</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
