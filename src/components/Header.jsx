import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <header className="header-container">
      <div className="header-inner">

        <Link to="/">
          <img src="/images/logo.png" alt="Logo d'entreprise" className="header-logo" />
        </Link>

        <div className="header-search-bar">
          <input
            type="text"
            id="recherche"
            placeholder="Chercher ce que vous voulez"
          />
          <button type="submit">
            <i className="fa fa-search"></i> Recherche
          </button>
        </div>

        <nav className="header-nav">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/connexion">Connexion / Inscription</Link></li>

            <li
              className="dropdown"
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
            >
              <span>Boutique ▾</span>
              {showSubMenu && (
                <div className="submenu">
                  <div className="submenu-column">
                    <Link to="/boutique/chiens"> Chiens</Link>
                    <Link to="/boutique/chats"> Chats</Link>
                  </div>
                </div>
              )}
            </li>

            <li><Link to="/panier">Panier</Link></li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
