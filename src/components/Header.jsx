import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

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
              onMouseEnter={() => setHoveredMenu('chiens')}
              onMouseLeave={() => setHoveredMenu(null)}
              className="dropdown"
            >
              <span>CHIENS ▾</span>
              {hoveredMenu === 'chiens' && (
                <div className="submenu">
                  <Link to="/chiens/alimentation">Alimentation CHIENS</Link>
                  <Link to="/chiens/gamelles">Gamelles et distributeurs</Link>
                  <Link to="/chiens/hygiene">Hygiène et soin chiens</Link>
                  <Link to="/chiens/accessoires">Accessoires chiens</Link>
                  <Link to="/chiens/habitat">Habitat et couchage</Link>
                  <Link to="/chiens/vetements">Vêtements chiens</Link>
                  <Link to="/chiens/jouets">Jouets</Link>
                  <Link to="/chiens/transport">Transport chiens</Link>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => setHoveredMenu('chats')}
              onMouseLeave={() => setHoveredMenu(null)}
              className="dropdown"
            >
              <span>CHATS ▾</span>
              {hoveredMenu === 'chats' && (
                <div className="submenu">
                  <Link to="/chats/alimentation">Alimentation chats</Link>
                  <Link to="/chats/litiere">Gamelles et distributeurs</Link>
                  <Link to="/chats/jouets">Hygiène et soin chats</Link>
                  <Link to="/chats/accessoires">Accessoires</Link>
                  <Link to="/chats/arbre">Habitat et couchage</Link>
                  <Link to="/chats/soin">Vêtements chats</Link>
                  <Link to="/chats/arbre">Jouets</Link>
                  <Link to="/chats/soin">Transport chats</Link>
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
