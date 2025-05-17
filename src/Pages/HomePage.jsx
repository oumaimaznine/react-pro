import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]); // État pour stocker la liste des produits

  useEffect(() => {
    // Charger les produits depuis l'API Laravel lors du montage du composant
    axios.get('http://localhost:8000/api/products')
      .then((res) => {
        setProducts(res.data); // Stocker les produits dans le state
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des produits:', error);
      });
  }, []);

  return (
    <main>

      {/* Image de couverture principale */}
      <section>
        <div className="hero-image">
          <img src="/images/3.png" alt="Clients heureux avec leur chien" />
        </div>
      </section>

      {/* Section des catégories pour Chats */}
      <section className="categories-section">
        <h2>Catégories pour Chats</h2>
        <div className="categories-grid">

          {/* Chaque élément représente une catégorie avec image + lien */}
          <div className="category-item">
            <Link to="/category/3" className="category-link">
              <img src="/images/10.jpg" alt="Alimentation chats" />
              <p>Alimentation CHATS</p>
            </Link>
          </div>

          {/* Répéter pour chaque catégorie */}
          <div className="category-item">
            <Link to="/category/6" className="category-link">
              <img src="/images/11.jpg" alt="Gamelles" />
              <p>Gamelles et distributeurs</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/5" className="category-link">
              <img src="/images/h.jpg" alt="Hygiène" />
              <p>Hygiène et soin</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/6" className="category-link">
              <img src="/images/c.jpg" alt="Habitat" />
              <p>Habitat et Couchage</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/7" className="category-link">
              <img src="/images/a.jpg" alt="Accessoires" />
              <p>Accessoires</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/8" className="category-link">
              <img src="/images/l.jpg" alt="Litière" />
              <p>Litières et bacs à litière</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/9" className="category-link">
              <img src="/images/j.jpg" alt="Jouets" />
              <p>Jouets</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/10" className="category-link">
              <img src="/images/t.jpg" alt="Transport" />
              <p>Transport</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section des catégories pour Chiens */}
      <section className="categories-section">
        <h2>Catégories pour Chiens</h2>
        <div className="categories-grid">
          <div className="category-item">
            <Link to="/category/11" className="category-link">
              <img src="/images/ali.jpg" alt="Alimentation" />
              <p>Alimentation CHIENS</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/12" className="category-link">
              <img src="/images/A.jpg" alt="Gamelles" />
              <p>Gamelles et distributeurs</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/13" className="category-link">
              <img src="/images/v.jpg" alt="Hygiène" />
              <p>Hygiène et soin</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/14" className="category-link">
              <img src="/images/Q.jpg" alt="Habitat" />
              <p>Habitat et Couchage</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/15" className="category-link">
              <img src="/images/R.jpg" alt="Accessoires" />
              <p>Accessoires</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/16" className="category-link">
              <img src="/images/K.jpg" alt="Toilettage" />
              <p>Toilettage</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/17" className="category-link">
              <img src="/images/G.jpg" alt="Jouets" />
              <p>Jouets</p>
            </Link>
          </div>

          <div className="category-item">
            <Link to="/category/18" className="category-link">
              <img src="/images/p.jpg" alt="Transport" />
              <p>Transport</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Section d’introduction avec texte principal */}
      <section className="intro-section">
        <h1>Votre animal mérite ce qu’il y a de mieux.</h1>
        <p className="intro-subtext">
          Produits de qualité pour chiens et chats livrés rapidement.
        </p>
      </section>

      {/* Section des produits récents (nouvel arrivage) */}
      <section className="product-section">
        <h2 className="section-title"> Nouvel arrivage</h2>

        <div className="products-grid">
  {products.length > 0 ? (
    products.map((product) => (
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
            src={`http://127.0.0.1:8000/${product.images[0].url}`}
            alt={product.name}
            className="product-image"
          />
        )}
        {/* Nom du produit */}
        <h3 className="product-titlee">{product.name}</h3>

        {/*  Prix avec old_price si promo */}
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

      </section>
    </main>
  );
};

export default HomePage;
