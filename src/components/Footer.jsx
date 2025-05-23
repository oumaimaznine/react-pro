import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log(`Inscription newsletter avec l'email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Bloc À propos */}
        <div className="footer-block">
          <h3 className="footer-title">À propos</h3>
          <p className="footer-text">
            Chaque animal mérite attention et bien-être. Nous vous proposons des produits de qualité adaptés à leurs besoins, pour qu'ils se sentent heureux et en bonne santé.
          </p>
        </div>

        {/* Bloc Newsletter */}
        <div className="footer-block">
          <h3 className="footer-title">Inscrivez-vous à notre newsletter</h3>
          <p className="footer-text">Recevez nos dernières offres et actualités.</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">S'inscrire</button>
          </form>
        </div>

        {/* Bloc Contact */}
        <div className="footer-block">
          <h3 className="footer-title">Contactez-nous</h3>
          <Link to="/contact" className="footer-link">contactez-nous</Link>
          <p className="footer-text">Téléphone: +212 777036260</p>
        </div>
      </div>

      <p className="footer-bottom-text">© 2025 Nourriture des Fidèles. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
