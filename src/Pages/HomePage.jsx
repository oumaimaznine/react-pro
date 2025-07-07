import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20); 
  const [bestSellers, setBestSellers] = useState([]);
  const [reviews, setReviews] = useState([]);

  
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/suggestions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setProducts(res.data);
          } else {
            // fallback même si connecté mais aucun achat
            fetchLatestOrPromo();
          }
        })
        .catch((err) => {
          console.warn("Erreur suggestions ou token invalide:", err);
          fetchLatestOrPromo();
        });
    } else {
      // fallback si non connecté
      fetchLatestOrPromo();
    }
  }, []);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/bestsellers`)
      .then(res => setBestSellers(res.data))
      .catch(err => console.error("Erreur lors du chargement des meilleures ventes:", err));
  }, []);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Erreur chargement avis:", err));
  }, []);
  
  

  const fetchLatestOrPromo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/latest-or-promo`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
     
      });
  };

  return (
    <main>
      {/* Hero Image */}
      <section>
        <div className="hero-image">
          <img src={`${process.env.PUBLIC_URL}/images/3.png`} alt="Clients heureux avec leur chien" />
        </div>
      </section>

      {/* Catégories Chats */}
      <section className="categories-section">
        <h2>Catégories pour Chats</h2>
        <div className="categories-grid">
          <div className="category-item">
            <Link to="/category/3" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/10.jpg`} alt="Alimentation chats" />
              <p>Alimentation CHATS</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/6" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/11.jpg`} alt="Gamelles" />
              <p>Gamelles et distributeurs</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/9" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/h.jpg`} alt="Hygiène" />
              <p>Hygiène et soin</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/10" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/c.jpg`} alt="Habitat" />
              <p>Habitat et Couchage</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/11" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/a.jpg`} alt="Accessoires" />
              <p>Accessoires</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/12" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/l.jpg`} alt="Litière" />
              <p>Litières et bacs à litière</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/5" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/j.jpg`} alt="Jouets" />
              <p>Jouets</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/14" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/t.jpg`} alt="Transport" />
              <p>Transport</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories Chiens */}
      <section className="categories-section">
        <h2>Catégories pour Chiens</h2>
        <div className="categories-grid">
          <div className="category-item">
            <Link to="/category/7" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/ali.jpg`} alt="Alimentation" />
              <p>Alimentation CHIENS</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/16" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/M.jpg`} alt="Gamelles" />
              <p>Gamelles et distributeurs</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/17" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/v.jpg`} alt="Hygiène" />
              <p>Hygiène et soin</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/18" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/Q.jpg`} alt="Habitat" />
              <p>Habitat et Couchage</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/19" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/R.jpg`} alt="Accessoires" />
              <p>Accessoires</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/8" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/38.png`} alt="vétements" />
              <p>Vétements</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/15" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/G.jpg`} alt="Jouets" />
              <p>Jouets</p>
            </Link>
          </div>
          <div className="category-item">
            <Link to="/category/21" className="category-link">
              <img src={`${process.env.PUBLIC_URL}/images/p.jpg`} alt="Transport" />
              <p>Transport</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <h1>Votre animal mérite ce qu’il y a de mieux.</h1>
        <p className="intro-subtext">
          Produits de qualité pour chiens et chats livrés rapidement.
        </p>
      </section>

      {/* Produits personnalisés ou promo */}
      <section className="product-section">
  <div className="section-title-with-line">
    <hr />
    <h3 className="recommend-title">Articles Recommandés pour Vous</h3>
    <hr />
  </div>
    
        <div className="products-grid">
          {products.length > 0 ? (
            products.slice(0, visibleCount).map((product) => (
              
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div className="product-image-wrapper">
                  {product.images?.[0]?.url && (
                    <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/${product.images[0].url}`}
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
        {visibleCount < products.length && (
    <div className="text-center mt-4">
      <button onClick={() => setVisibleCount(visibleCount + 20)} className="btn-load-more">
        Voir plus
      </button>
      </div>
  )}
    </section>

    {/* Meilleures ventes */}
    
 
    <section className="recommended-container">
  <div className="section-title-with-line">
    <hr />
    <h3 className="recommend-title">Meilleures Ventes</h3>
    <hr />
  </div>
  <div className="recommended-list">
    {bestSellers.map(product => (
      <Link key={product.id} to={`/product/${product.id}`} className="recommended-card">
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${product.images?.[0]?.url}`}
          alt={product.name}
        />
        {product.is_promo === 1 && (
          <span className="promo-label">Promotion</span>
        )}
        <p className="product-name">{product.name}</p>
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
    ))}
  </div>
    </section>
    <section className="reviewss-section">
  <div className="section-title-with-line">
    <hr />
    <h2 className="section-title">Meilleurs Avis</h2>
    <hr />
  </div>
  <div className="reviewss-grid">
    {reviews.map((review, index) => (
      <div key={index} className="reviews-card">
        <div className="starss">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < review.rating ? '#facc15' : '#ddd'} />
          ))}
        </div>
        <h4 className="reviews-title">{review.title}</h4>
        <p className="reviews-name">{review.user_name}</p>
        <p className="reviews-comment">"{review.comment}"</p>
        <p className="reviews-date">{new Date(review.created_at).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
</section>
  </main>
);
};

export default HomePage;
