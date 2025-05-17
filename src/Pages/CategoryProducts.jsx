
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";

function CategoryProducts() {
  const { id } = useParams();
  const cleanId = id.replace(":", "");

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${cleanId}/products?page=${currentPage}&sort=${sortBy}`)
      .then((response) => {
        setProducts(response.data.data);
        setLastPage(response.data.last_page);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement:", error);
      });
  }, [cleanId, sortBy, currentPage]);

  return (
    <div className="product-list">
      <h2>Liste des Produits</h2>

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
          <option value="name_asc">A → Z</option>
          <option value="name_desc">Z → A</option>
          <option value="newest">Plus récent</option>
          <option value="oldest">Plus ancien</option>
        </select>
      </div>

      {/* Grille produits */}
      <div className="products-grid">
  {products.length > 0 ? (
    products.map((product) => (
      <Link key={product.id} to={`/product/${product.id}`} className="product-card">
        
        {/*  Label Promotion si promo */}
        {product.is_promo === 1 && (
          <span className="promo-label">Promotion</span>
        )}

        {/*  Image */}
        {product.images?.[0]?.url && (
          <img
            src={`http://127.0.0.1:8000/${product.images[0].url}`}
            alt={product.name}
            className="product-image"
          />
        )}

        {/* Titre */}
        <h3 className="product-titlee">{product.name}</h3>

        {/*  Prix */}
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

      </Link>
    ))
  ) : (
    <p>Aucun produit trouvé pour cette catégorie.</p>
  )}
</div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          &lt;
        </button>
        {[...Array(lastPage)].map((_, i) => {
          const page = i + 1;
          if (
            page === 1 ||
            page === lastPage ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          }
          if ((page === currentPage - 2 && page !== 2) || (page === currentPage + 2 && page !== lastPage - 1)) {
            return <span key={page}>...</span>;
          }
          return null;
        })}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))} disabled={currentPage === lastPage}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default CategoryProducts;
