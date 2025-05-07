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
      <div className="product-grid">
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product.id} className="product-card">
              {product.images && product.images.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000/${product.images[0].url}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <Link to={`/product/${product.id}`} className="product-name">
                {product.name}
              </Link>
              <p className="product-price">
                À partir de {parseFloat(product.price).toFixed(2)} Dh
              </p>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default RecherchePage;
