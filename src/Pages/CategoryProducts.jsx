import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CategoryProducts.css";

function CategoryProducts() {
  const { id } = useParams(); 
  const cleanId = id.replace(":", ""); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/category/${cleanId}/products`)
      .then((response) => {
        setProducts(response.data.data); 
      })
      .catch((error) => {
        console.error("Erreur lors du chargement:", error);
      });
  }, [cleanId]);

  return (
    <div className="product-list">
      <h2>Liste des Produits</h2>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >
              <img 
                src={`http://127.0.0.1:8000/${product.images?.[0]?.url}`} 
                alt={product.name} 
                className="product-image" 
              />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">
                À partir de <strong>{parseFloat(product.price).toFixed(2)} Dhs</strong>
              </p>
            </Link>
          ))
        ) : (
          <p>Aucun produit trouvé pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
