import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  // Chargement des produits (exemple de données)
  useEffect(() => {
    // Ici, tu pourrais faire une requête API pour récupérer les produits
    // Pour cet exemple, j'utilise des données statiques
    setProducts([
      { id: 1, name: 'Aliment pour chien', price: 20, image: '/product1.jpg' },
      { id: 2, name: 'Collier pour chat', price: 15, image: '/product2.jpg' },
      { id: 3, name: 'Jouet pour chien', price: 10, image: '/product3.jpg' },
    ]);
  }, []);

  return (
    <div>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/logo_entrep.png" alt="Logo" />
          </Link>
        </div>
      </header>

      <main>
        <section className="products">
          <h2>Nos Produits</h2>
          <div className="product-list">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price} MAD</p>
                <Link to={`/produits/${product.id}`} className="btn-primary">Voir le produit</Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© 2025 XXXXXXXXXX. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
