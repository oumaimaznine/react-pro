import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';


const HomePage = () => {
  const [products, setProducts] = useState([]); // État pour stocker la liste des produits

  useEffect(() => {
    // Charger les produits depuis l'API Laravel lors du montage du composant
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)

      .then((res) => {
        setProducts(res.data.data); // Stocker les produits dans le state
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des produits:', error);
      });
  }, []);

  return ( 
  <>
   <Helmet>
  {/*  Titre principal de la page — affiché dans les résultats de recherche Google */}
  <title>Nourritures des Fidèles – Boutique pour chiens et chats</title>

  {/*  Meta description — résumé qui s'affiche sous le titre sur Google */}
  <meta
    name="description"
    content="Découvrez nos produits de qualité pour chiens et chats : alimentation, hygiène, accessoires, jouets. Livraison rapide partout au Maroc."
  />

  {/*  Ancienne balise SEO — moins utilisée aujourd’hui, mais reste utile */}
  <meta
    name="keywords"
    content="nourriture chien, nourriture chat, croquettes, jouets animaux, soins animaux, boutique animaux Maroc"
  />

  {/*  Canonical — indique à Google l’URL principale de cette page pour éviter le contenu dupliqué */}
  <link rel="canonical" href="http://localhost:3000/" />

  {/*  Balises Open Graph — utilisées pour améliorer l’aperçu lors du partage sur Facebook, WhatsApp, etc. */}
  <meta property="og:title" content="Nourritures des Fidèles - Produits pour Chiens & Chats" />
  <meta property="og:description" content="Produits de qualité, livraison rapide partout au Maroc." />
  <meta property="og:image" content="http://localhost:3000/images/cover.png" />
  <meta property="og:url" content="http://localhost:3000/" />
  <meta property="og:type" content="website" />
</Helmet>
{/*  Schema.org: C’est un code caché (en JSON) que tu ajoutes dans ta page
    pour aider Google à comprendre exactement ce qu’il y a sur ton site.
    Résultat → Meilleur référencement, rich snippets (prix, stock, image...) */}

<script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebSite",            // Type de contenu : ici un site web (pas un produit)
  "name": "Nourritures des Fidèles", // Nom du site
  "url": "http://localhost:3000",    // URL du site (à changer en production)
  "description": "Boutique locale pour chiens et chats : croquettes, hygiène, jouets, accessoires." //  Description courte utile pour les résultats enrichis
}
`}
</script>

    <main>

      {/* Image de couverture principale */}
      <section>
  <div className="hero-image">
    <img src={`${process.env.PUBLIC_URL}/images/3.png`} alt="Clients heureux avec leur chien" />
  </div>
</section>


      {/* Section des catégories pour Chats */}
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
      <Link to="/category/5" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/h.jpg`} alt="Hygiène" />
        <p>Hygiène et soin</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/6" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/c.jpg`} alt="Habitat" />
        <p>Habitat et Couchage</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/7" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/a.jpg`} alt="Accessoires" />
        <p>Accessoires</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/8" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/l.jpg`} alt="Litière" />
        <p>Litières et bacs à litière</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/9" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/j.jpg`} alt="Jouets" />
        <p>Jouets</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/10" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/t.jpg`} alt="Transport" />
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
        <img src={`${process.env.PUBLIC_URL}/images/ali.jpg`} alt="Alimentation" />
        <p>Alimentation CHIENS</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/12" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/A.jpg`} alt="Gamelles" />
        <p>Gamelles et distributeurs</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/13" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/v.jpg`} alt="Hygiène" />
        <p>Hygiène et soin</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/14" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/Q.jpg`} alt="Habitat" />
        <p>Habitat et Couchage</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/15" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/R.jpg`} alt="Accessoires" />
        <p>Accessoires</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/16" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/K.jpg`} alt="Toilettage" />
        <p>Toilettage</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/17" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/G.jpg`} alt="Jouets" />
        <p>Jouets</p>
      </Link>
    </div>

    <div className="category-item">
      <Link to="/category/18" className="category-link">
        <img src={`${process.env.PUBLIC_URL}/images/p.jpg`} alt="Transport" />
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
          {/* Image du produit dans wrapper */}
          <div className="product-image-wrapper">
            {product.images?.[0]?.url && (
              <img
                src={`${process.env.REACT_APP_API_URL}/${product.images[0].url}`}
                alt={product.name}
                className="product-image"
              />
            )}
          </div>

          {/* Badge Promotion en dessous de l’image */}
          {product.is_promo === 1 && (
            <div className="promo-label">Promotion</div>
          )}

          {/* Nom du produit */}
          <h3 className="product-titlee">{product.name}</h3>

          {/* Prix */}
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
    </>
  );
};

export default HomePage;
