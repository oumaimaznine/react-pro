import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors du chargement des catégories:', error));
  }, []);

  // نفيترو الكاتيجوريات حسب النوع (مثلا parent_category_id ديال CHIENS هو 1)
  const chiensCategories = categories.filter(cat => cat.parent_category_id === 1);
  const chatsCategories = categories.filter(cat => cat.parent_category_id === 10);

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

            {/* Menu CHIENS */}
            <li
              onMouseEnter={() => setHoveredMenu('chiens')}
              onMouseLeave={() => setHoveredMenu(null)}
              className="dropdown"
            >
              <span>CHIENS ▾</span>
              {hoveredMenu === 'chiens' && (
                <div className="submenu">
                  {chiensCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Menu CHATS */}
            <li
              onMouseEnter={() => setHoveredMenu('chats')}
              onMouseLeave={() => setHoveredMenu(null)}
              className="dropdown"
            >
              <span>CHATS ▾</span>
              {hoveredMenu === 'chats' && (
                <div className="submenu">
                  {chatsCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`}>
                      {cat.name}
                    </Link>
                  ))}
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
