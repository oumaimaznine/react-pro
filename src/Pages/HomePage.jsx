import React from 'react';
import { Link } from 'react-router-dom'; // Importation pour la navigation sans rechargement
import './HomePage.css'; // Importation des styles spécifiques

// Composant fonctionnel représentant la page d'accueil
const HomePage = () => {
  return (
    <main>
      {/* Section d'accueil avec vidéo */}
      <section className="description">
        <h2>Bienvenue dans notre boutique en ligne dédiée aux animaux !</h2>
        <div className="video-container">
          <video width="90%" height="80%" controls loop muted autoPlay>
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
            Découvrez une large gamme d'aliments de haute qualité pour vos animaux,
            adaptés à tous les besoins et toutes les races. Offrez à votre compagnon
            une alimentation saine et équilibrée.
          </p>
          <Link to="/produits/alimentation" className="btn-secondary">Voir le produit</Link>
        </div>

        {/* Bloc produit : Accessoires */}
        <div className="product">
          <img src="/acc.jpg" alt="Produit Accessoires" />
          <h3>Accessoires indispensables pour votre animal</h3>
          <p>
            Des colliers, des laisses et des lits pour animaux qui allient confort,
            sécurité et style. Chouchoutez votre animal avec nos accessoires modernes
            et pratiques.
          </p>
          <Link to="/produits/accessoires" className="btn-secondary">Voir le produit</Link>
        </div>

        {/* Bloc produit : Jouets */}
        <div className="product">
          <img src="/jouets.jpg" alt="Produit Jouets" />
          <h3>Jouets amusants et stimulants pour votre animal</h3>
          <p>
            Nos jouets sont conçus pour stimuler l'esprit de votre animal tout en lui
            offrant des heures de jeu et d'amusement. Parfait pour tous les types de
            chiens et de chats.
          </p>
          <Link to="/produits/jouets" className="btn-secondary">Voir le produit</Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
