import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Pour utiliser les liens sans rechargement de page
import './Footer.css';  // Importation du fichier CSS spécifique au footer

const Footer = () => {
  const [email, setEmail] = useState('');  // État pour gérer l'email de la newsletter

  // Fonction de soumission du formulaire de la newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();  // Empêche le rechargement de la page
    console.log(`Inscription newsletter avec l'email: ${email}`);
    setEmail('');  // Réinitialise le champ email
  };

  return (
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
              onChange={(e) => setEmail(e.target.value)}  // Mise à jour de l'email
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
  );
};

export default Footer;
