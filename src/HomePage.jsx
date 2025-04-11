import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importation pour gérer la navigation sans rechargement de page
import './HomePage.css'; // Importation des styles spécifiques à cette page

// Composant fonctionnel représentant la page d'accueil
const HomePage = () => {
  // État local pour stocker l'email de la newsletter
  const [email, setEmail] = useState('');

  // Fonction appelée lors de la soumission du formulaire de newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log(`Inscription newsletter avec l'email: ${email}`); // Affichage temporaire de l'email en console
    setEmail(''); // Réinitialise le champ email
  };

  return (
    <div>
      {/* En-tête du site avec logo, recherche et navigation */}
      <header className="header">
        <div className="container">
          {/* Logo cliquable redirigeant vers l'accueil */}
          <Link to="/">
            <img src="/logo_entrep.png" alt="Logo d'entreprise" className="logo" />
          </Link>

          {/* Barre de recherche */}
          <div className="search-bar">
            <input
              type="text"
              id="recherche"
              placeholder="Chercher ce que vous voulez"
            />
            <button type="submit">
              <i className="fa fa-search"></i> Recherche
            </button>
          </div>

          {/* Menu de navigation */}
          <nav>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/connexion">Connexion / Inscription</Link></li>
              <li><Link to="/produits">Boutique</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenu principal du site */}
      <main>
        {/* Section d'accueil avec vidéo */}
        <section className="description">
          <h2>Bienvenue dans notre boutique en ligne dédiée aux animaux !</h2>
          <div className="video-container">
            <video width="80%" height="80%" controls loop muted autoPlay>
              <source src="/vedio2.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas les vidéos.
            </video>
          </div>
        </section>

        {/* Section des produits présentés sur la page d'accueil */}
        <section className="products">
          {/* Bloc produit : Alimentation */}
          <div className="product">
            <img src="/ali.jpg" alt="Produit Alimentation" />
            <img src="/ch.jpg" alt="Produit Alimentation" />
            <h3>Alimentation pour animaux : un choix varié et équilibré</h3>
            <p>
              Découvrez une large gamme d'aliments de haute qualité pour vos animaux, adaptés à tous les besoins et toutes les races. Offrez à votre compagnon une alimentation saine et équilibrée.
            </p>
            <Link to="/produits/alimentation" className="btn-secondary">Voir le produit</Link>
          </div>

          {/* Bloc produit : Accessoires */}
          <div className="product">
            <img src="/acc.jpg" alt="Produit Accessoires" />
            <h3>Accessoires indispensables pour votre animal</h3>
            <p>
              Des colliers, des laisses et des lits pour animaux qui allient confort, sécurité et style. Chouchoutez votre animal avec nos accessoires modernes et pratiques.
            </p>
            <Link to="/produits/accessoires" className="btn-secondary">Voir le produit</Link>
          </div>

          {/* Bloc produit : Jouets */}
          <div className="product">
            <img src="/jouets.jpg" alt="Produit Jouets" />
            <h3>Jouets amusants et stimulants pour votre animal</h3>
            <p>
              Nos jouets sont conçus pour stimuler l'esprit de votre animal tout en lui offrant des heures de jeu et d'amusement. Parfait pour tous les types de chiens et de chats.
            </p>
            <Link to="/produits/jouets" className="btn-secondary">Voir le produit</Link>
          </div>
        </section>
      </main>

      {/* Pied de page (footer) */}
      <footer>
        <div className="container">
          {/* Bloc À propos */}
          <div className="footer-content">
            <h3>À propos</h3>
            <p>
              Chaque animal mérite attention et bien-être. Nous vous proposons des produits de qualité adaptés à leurs besoins, pour qu'ils se sentent heureux et en bonne santé.
            </p>
          </div>

          {/* Bloc Newsletter */}
          <div className="footer-newsletter">
            <h3>Inscrivez-vous à notre newsletter</h3>
            <p>Recevez nos dernières offres et actualités.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l’état de l’email à chaque frappe
              />
              <button type="submit">S'inscrire</button>
            </form>
          </div>

          {/* Bloc Contact */}
          <div className="footer-contacter">
            <h3>Contactez-nous</h3>
            <Link to="/contact">contactez-nous</Link>
            <p>Téléphone: +212 777036260</p>
          </div>
        </div>

        {/* Mentions légales */}
        <p className="footer-foot">© 2025 XXXXXXXXXX. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;