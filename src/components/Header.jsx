import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import { FiUser, FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { FaDog, FaCat, FaTags, FaHome } from 'react-icons/fa';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    // 🔽 Récupération des catégories
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors du chargement des catégories:', error));

    // 🔽 Lecture sécurisée de l'utilisateur dans localStorage
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erreur JSON.parse sur user:", error);
      localStorage.removeItem('user');
    }

    // 🔽 Gestion du clic extérieur
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (hoveredMenu === 'search') setHoveredMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hoveredMenu]);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/connexion');
    }).catch(err => console.error("Erreur logout:", err));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/recherche?query=${encodeURIComponent(searchTerm)}`);
  };

  const chiensCategories = categories.filter(cat => cat.parent_category_id === 1);
  const chatsCategories = categories.filter(cat => cat.parent_category_id === 2);

  return (
    <header className="header-container">
      <div className="header-inner">

        {/* LOGO */}
        <Link to="/">
          <img src="/images/logo.png" alt="Logo d'entreprise" className="header-logo" />
        </Link>

        {/* MENU CENTRE */}
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/" className="nav-item">
                <FaHome className="header-icon" /> Accueil
              </Link>
            </li>

            {/* CHIENS */}
            <li onMouseEnter={() => setHoveredMenu('chiens')} onMouseLeave={() => setHoveredMenu(null)} className="dropdown">
              <span className="nav-item">
                <FaDog className="header-icon" /> Chiens <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'chiens' && (
                <div className="submenu">
                  {chiensCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* CHATS */}
            <li onMouseEnter={() => setHoveredMenu('chats')} onMouseLeave={() => setHoveredMenu(null)} className="dropdown">
              <span className="nav-item">
                <FaCat className="header-icon" /> Chats <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'chats' && (
                <div className="submenu">
                  {chatsCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* PROMO */}
            <li>
              <Link to="/promo" className="nav-item">
                <FaTags className="header-icon" /> Promo
              </Link>
            </li>
          </ul>
        </nav>

        {/* BARRE DE RECHERCHE */}
        <div className="header-search-bar" ref={searchRef}>
          <input
            type="text"
            id="recherche"
            placeholder="Chercher ce que vous voulez"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button type="button" onClick={handleSearch}>
            <i className="fa fa-search"></i> Recherche
          </button>
        </div>

        {/* UTILISATEUR + PANIER */}
        <nav className="header-nav">
          <ul>
            {/* UTILISATEUR */}
            <li className="dropdown">
              <span onClick={() => setHoveredMenu(hoveredMenu === 'user' ? null : 'user')} className="nav-item">
                <FiUser className="header-icon" />
                {user ? `Bonjour, ${user.name}` : 'Se connecter'}
                <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'user' && (
                <div className="submenu">
                  {user ? (
                    <>
                      <Link to="/profil">Votre compte</Link>
                      <Link to="/confirmation">Vos commandes</Link>
                      <Link to="#" onClick={handleLogout}>Se déconnecter</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/connexion" className="main-connect-btn">Se connecter</Link>
                      <Link to="/profil">Votre compte</Link>
                      <Link to="/commandes">Vos commandes</Link>
                    </>
                  )}
                </div>
              )}
            </li>

            {/* PANIER */}
            <li>
              <Link to="/panier" className="nav-item">
                <FiShoppingCart className="header-icon" /> Panier
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
