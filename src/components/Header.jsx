import React from 'react';
import { Link } from 'react-router-dom'; 
const Header = () => {
  return (
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
            <li><Link to="/panier">Panier</Link></li>
          </ul>
        </nav>
  
      </div>
    </header>
  );
};

export default Header;
