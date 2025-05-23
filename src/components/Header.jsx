import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Pour la navigation entre pages
import axios from 'axios';
import './Header.css'; // Fichier CSS du header
import { FaDog, FaCat, FaTags } from 'react-icons/fa'; // Icônes pour les catégories
import { FiHome, FiUser, FiChevronDown, FiShoppingCart, FiMenu, FiX, FiSearch } from 'react-icons/fi'; // Autres icônes utiles

// Composant principal Header
const Header = () => {
  // États pour gérer le menu survolé, les catégories, l'utilisateur connecté, la recherche, etc.
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate(); // Pour rediriger vers une autre page
  const searchRef = useRef(); // Pour fermer la barre de recherche quand on clique à l'extérieur

  // useEffect pour charger les catégories et récupérer l'utilisateur depuis localStorage
  useEffect(() => {
    // Charger les catégories depuis l’API Laravel
    axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors du chargement des catégories:', error));

    // Charger l'utilisateur connecté s’il est présent dans localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fermer le menu de recherche si on clique à l’extérieur
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (hoveredMenu === 'search') setHoveredMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hoveredMenu]);

  // Fonction pour déconnexion
  const handleLogout = () => {
    const token = localStorage.getItem('token');
    axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/connexion');
    }).catch(err => console.error("Erreur logout:", err));
  };

  // Fonction pour la recherche
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    navigate(`/recherche?query=${encodeURIComponent(searchTerm)}`);
    setShowMobileSearch(false);
  };

  // Filtrer les catégories en fonction des types (chiens / chats)
  const chiensCategories = categories.filter(cat => cat.parent_category_id === 1);
  const chatsCategories = categories.filter(cat => cat.parent_category_id === 2);

  return (
    <>
      {/* ----------- EN-TÊTE MOBILE ----------- */}
      <header className="header-container">
        <div className="header-inner mobile-header">
          {/* Icône menu burger */}
          <div className="mobile-menu-toggle">
            {isMobileMenuOpen ? (
              <FiX className="burger-icon" onClick={() => setIsMobileMenuOpen(false)} />
            ) : (
              <FiMenu className="burger-icon" onClick={() => setIsMobileMenuOpen(true)} />
            )}
          </div>

          {/* Logo cliquable */}
          <Link to="/" className="mobile-logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="header-logo" />
          </Link>

          {/* Icônes recherche et panier */}
          <div className="mobile-icons">
            <button onClick={() => setShowMobileSearch(true)} className="mobile-search-icon">
              <FiSearch className="header-icon" />
            </button>
            <Link to="/panier">
              <FiShoppingCart className="header-icon" />
            </Link>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        {showMobileSearch && (
          <div className="mobile-search-overlay">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                type="text"
                placeholder="Chercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button type="submit"><FiSearch /></button>
              <button type="button" onClick={() => setShowMobileSearch(false)} className="close-search"><FiX /></button>
            </form>
          </div>
        )}

        {/* ----------- EN-TÊTE DESKTOP ----------- */}
        <div className="desktop-header">
          <div className="header-inner">
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo d'entreprise" className="header-logo" />
            </Link>

            {/* Menu de navigation principal */}
            <nav className="header-nav">
              <ul>
                <li><Link to="/" className="nav-item"><FiHome className="header-icon" /> Accueil</Link></li>

                {/* Menu Chiens avec sous-catégories */}
                <li onMouseEnter={() => setHoveredMenu('chiens')} onMouseLeave={() => setHoveredMenu(null)} className="dropdown">
                  <span className="nav-item"><FaDog className="header-icon" /> Chiens <FiChevronDown className="header-icon" /></span>
                  {hoveredMenu === 'chiens' && (
                    <div className="submenu">
                      {chiensCategories.map(cat => (
                        <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </li>

                {/* Menu Chats avec sous-catégories */}
                <li onMouseEnter={() => setHoveredMenu('chats')} onMouseLeave={() => setHoveredMenu(null)} className="dropdown">
                  <span className="nav-item"><FaCat className="header-icon" /> Chats <FiChevronDown className="header-icon" /></span>
                  {hoveredMenu === 'chats' && (
                    <div className="submenu">
                      {chatsCategories.map(cat => (
                        <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
                      ))}
                    </div>
                  )}
                </li>

                {/* Lien vers page Promo */}
                <li><Link to="/promo" className="nav-item"><FaTags className="header-icon" /> Promo</Link></li>
              </ul>
            </nav>

            {/* Barre de recherche desktop */}
            <div className="header-search-bar" ref={searchRef}>
              <input
                type="text"
                placeholder="Chercher ce que vous voulez"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button type="button" onClick={handleSearch}>
                <FiSearch className="header-icon" />
              </button>
            </div>

            {/* Menu utilisateur avec sous-menu connecté ou pas */}
            <nav className="header-nav">
              <ul>
                <li className="dropdown">
                  <span onClick={() => setHoveredMenu(hoveredMenu === 'user' ? null : 'user')} className="nav-item">
                    <FiUser className="header-icon" />
                    {user ? `Bonjour, ${user.name.length > 10 ? user.name.slice(0, 10) + '…' : user.name}` : 'Se connecter'}
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

                <li><Link to="/panier" className="nav-item"><FiShoppingCart className="header-icon" /> Panier</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* ----------- MENU MOBILE DÉROULANT ----------- */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            <li><Link to="/" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}><FiHome className="header-icon" /> Accueil</Link></li>

            {/* Sous-menu Chiens pour mobile */}
            <li className="dropdown">
              <span className="nav-item" onClick={() => setHoveredMenu(hoveredMenu === 'mobile-chiens' ? null : 'mobile-chiens')}>
                <FaDog className="header-icon" /> Chiens <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'mobile-chiens' && (
                <div className="submenu">
                  {chiensCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* Sous-menu Chats pour mobile */}
            <li className="dropdown">
              <span className="nav-item" onClick={() => setHoveredMenu(hoveredMenu === 'mobile-chats' ? null : 'mobile-chats')}>
                <FaCat className="header-icon" /> Chats <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'mobile-chats' && (
                <div className="submenu">
                  {chatsCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>{cat.name}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* Lien Promo mobile */}
            <li><Link to="/promo" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}><FaTags className="header-icon" /> Promo</Link></li>

            {/* Menu utilisateur mobile */}
            <li className="dropdown">
              <span className="nav-item" onClick={() => setHoveredMenu(hoveredMenu === 'mobile-user' ? null : 'mobile-user')}>
                <FiUser className="header-icon" /> {user ? `Bonjour, ${user.name}` : 'Se connecter'} <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'mobile-user' && (
                <div className="submenu">
                  {user ? (
                    <>
                      <Link to="/profil" onClick={() => setIsMobileMenuOpen(false)}>Votre compte</Link>
                      <Link to="/confirmation" onClick={() => setIsMobileMenuOpen(false)}>Vos commandes</Link>
                      <span onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Se déconnecter</span>
                    </>
                  ) : (
                    <>
                      <Link to="/connexion" onClick={() => setIsMobileMenuOpen(false)}>Se connecter</Link>
                      <Link to="/profil" onClick={() => setIsMobileMenuOpen(false)}>Votre compte</Link>
                      <Link to="/commandes" onClick={() => setIsMobileMenuOpen(false)}>Vos commandes</Link>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
