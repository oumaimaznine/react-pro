import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import { FiUser, FiChevronDown, FiShoppingCart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { FaDog, FaCat, FaTags } from 'react-icons/fa';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors du chargement des catégories:', error));

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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
    setShowMobileSearch(false);
  };

  const chiensCategories = categories.filter(cat => cat.parent_category_id === 1);
  const chatsCategories = categories.filter(cat => cat.parent_category_id === 2);

  return (
    <>
      {/*MOBILE HEADER */}
      <header className="header-container">
        <div className="header-inner mobile-header">
          <div className="mobile-menu-toggle">
            {isMobileMenuOpen ? (
              <FiX className="burger-icon" onClick={() => setIsMobileMenuOpen(false)} />
            ) : (
              <FiMenu className="burger-icon" onClick={() => setIsMobileMenuOpen(true)} />
            )}
          </div>

          <Link to="/" className="mobile-logo">
            <img src="/images/logo.png" alt="Logo" className="header-logo" />
          </Link>

          <div className="mobile-icons">
            <button onClick={() => setShowMobileSearch(true)} className="mobile-search-icon">
              <FiSearch className="header-icon" />
            </button>
            <Link to="/panier">
              <FiShoppingCart className="header-icon" />
            </Link>
          </div>
        </div>
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
      <button type="submit">
        <FiSearch />
      </button>
      <button type="button" onClick={() => setShowMobileSearch(false)} className="close-search">
        <FiX />
      </button>
    </form>
  </div>
)}


        {/* DESKTOP HEADER  */}
        <div className="desktop-header">
          <div className="header-inner">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo d'entreprise" className="header-logo" />
            </Link>

            <nav className="header-nav">
              <ul>
                <li><Link to="/" className="nav-item">Accueil</Link></li>

                <li
                  onMouseEnter={() => setHoveredMenu('chiens')}
                  onMouseLeave={() => setHoveredMenu(null)}
                  className="dropdown"
                >
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

                <li
                  onMouseEnter={() => setHoveredMenu('chats')}
                  onMouseLeave={() => setHoveredMenu(null)}
                  className="dropdown"
                >
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

                <li><Link to="/promo" className="nav-item"><FaTags className="header-icon" /> Promo</Link></li>
              </ul>
            </nav>

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

            <nav className="header-nav">
              <ul>
                <li className="dropdown">
                  <span
                    onClick={() => setHoveredMenu(hoveredMenu === 'user' ? null : 'user')}
                    className="nav-item"
                  >
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

                <li><Link to="/panier" className="nav-item"><FiShoppingCart className="header-icon" /> Panier</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE MENU  */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            <li><Link to="/" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Accueil</Link></li>

            <li className="dropdown">
              <span className="nav-item" onClick={() => setHoveredMenu(hoveredMenu === 'mobile-chiens' ? null : 'mobile-chiens')}>
                <FaDog className="header-icon" /> Chiens <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'mobile-chiens' && (
                <div className="submenu">
                  {chiensCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li className="dropdown">
              <span className="nav-item" onClick={() => setHoveredMenu(hoveredMenu === 'mobile-chats' ? null : 'mobile-chats')}>
                <FaCat className="header-icon" /> Chats <FiChevronDown className="header-icon" />
              </span>
              {hoveredMenu === 'mobile-chats' && (
                <div className="submenu">
                  {chatsCategories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link to="/promo" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}><FaTags className="header-icon" /> Promo</Link></li>

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
