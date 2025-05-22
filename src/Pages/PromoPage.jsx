import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryProducts.css'; 

function PromoPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products?promo=1`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Erreur chargement promos:', err));
  }, []);

  return (
    <div className="product-list">
      <h2>Produits en Promotion</h2>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >
              {product.is_promo && (
                <span className="promo-label">Promotion</span>
              )}

              <img
                src={`${process.env.REACT_APP_API_URL}/${product.images?.[0]?.url}`}
                alt={product.name}
                className="product-image"
              />

              <h3 className="product-titlee">{product.name}</h3>

              <div className="price">
                {product.old_price && (
                  <span className="old-price">
                    {parseFloat(product.old_price).toFixed(2)} DH
                  </span>
                )}
                <span className="new-price">
                  {parseFloat(product.price).toFixed(2)} DH
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p>Aucun produit en promotion pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default PromoPage;
