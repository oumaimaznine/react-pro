import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './RecherchePage.css'; 

const RecherchePage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios.get(`/api/search?query=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error('Erreur recherche:', err));
    }
  }, [query]);

  return (
    <div className="recherche-container">
      <h2 className="recherche-title">Résultats pour : "{query}"</h2>
      <div className="products-grid">
      {results.length > 0 ? (
  results.map((product) => (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="product-card"
    >
      {/* Label Promotion si promo */}
      {product.is_promo === 1 && (
        <span className="promo-label">Promotion</span>
      )}

      {/* Image du produit */}
      {product.images?.[0]?.url && (
        <img
          src={`${process.env.REACT_APP_API_URL}/${product.images[0].url}`}
          alt={product.name}
          className="product-image"
        />
      )}

      {/* Nom du produit */}
      <h3 className="product-titlee">{product.name}</h3>

      {/* Prix avec old_price si promo */}
      <div className="price">
        {product.is_promo === 1 && product.old_price && (
          <span className="old-price">
            {parseFloat(product.old_price).toFixed(2)} Dhs
          </span>
        )}
        <span className="new-price">
          {parseFloat(product.price).toFixed(2)} Dhs
        </span>
      </div>
    </Link>
  ))
) : (
  <p>Aucun produit trouvé.</p>
)}

      </div>
    </div>
  );
};

export default RecherchePage;