import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryProducts.css';
import Loader from '../components/Loader';

function PromoPage() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`, {
        params: {
          promo: 1,
          sort: sortBy,
          page: currentPage,
        },
      })
      .then((res) => {
        setProducts(res.data.data || []);
        setLastPage(res.data.last_page || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur chargement promos:', err);
        setLoading(false);
      });
  }, [sortBy, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="product-list">
      <h2>Produits en Promotion</h2>

      {/* Tri */}
      <div className="filter-sort">
        <label htmlFor="sort">Trier par :</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Par défaut</option>
          <option value="price_asc">Prix : faible à élevé</option>
          <option value="price_desc">Prix : élevé à faible</option>
          <option value="name_asc">Nom : A → Z</option>
          <option value="name_desc">Nom : Z → A</option>
          <option value="newest">Plus récent</option>
          <option value="oldest">Plus ancien</option>
        </select>
      </div>

      {/* Loader / Produits */}
      {loading ? (
        <Loader />
      ) : (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-image-wrapper">
                  {product.images?.[0]?.url && (
                    <img
                    src={`${process.env.REACT_APP_API_URL}/${product.images[0].url}`}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                </div>

                {product.is_promo === 1 && (
                  <div className="promo-label">Promotion</div>
                )}

                <h3 className="product-titlee">{product.name}</h3>

                <div className="price">
                  {product.is_promo === 1 && product.old_price && (
                    <span className="old-price">
                      {parseFloat(product.old_price).toFixed(2)} DH
                    </span>
                  )}
                  {product.price !== null && (
                    <span className="new-price">
                      {parseFloat(product.price).toFixed(2)} DH
                    </span>
                  )}
                </div>

                {product.reviews_count > 0 && (
                  <div className="product-rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={
                          index < Math.round(product.reviews_avg_rating)
                            ? 'fas fa-star star-filled'
                            : 'far fa-star star-empty'
                        }
                      />
                    ))}
                    <span className="rating-count">
                      ({product.reviews_count})
                    </span>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p>Aucun produit en promotion pour le moment.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          {Array.from({ length: lastPage }).map((_, i) => {
            const page = i + 1;
            const isNear = Math.abs(currentPage - page) <= 1;

            if (page === 1 || page === lastPage || isNear) {
              return (
                <button
                  key={page}
                  className={page === currentPage ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            }

            if (
              (page === currentPage - 2 && page !== 2) ||
              (page === currentPage + 2 && page !== lastPage - 1)
            ) {
              return <span key={`dots-${page}`}>...</span>;
            }

            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default PromoPage;
