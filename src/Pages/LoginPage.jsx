import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Pour la navigation
import './LoginPage.css';  // Assurez-vous d'avoir ce fichier CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Pour gérer les erreurs
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
  const navigate = useNavigate(); // Pour naviguer après la connexion réussie

  // Validation de l'email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Veuillez entrer un email valide.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setErrorMessage(''); // Réinitialiser le message d'erreur
    setLoading(true); // Démarrer le chargement

    // Simulation de connexion avec une API ou une authentification
    setTimeout(() => {
      console.log('Email:', email, 'Mot de passe:', password);
      // Vous pouvez intégrer une authentification ici, par exemple avec Firebase ou un backend
      setLoading(false); // Arrêter le chargement
      navigate('/dashboard'); // Rediriger vers le tableau de bord ou autre page
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Connexion:</h2>
        
        {/* Affichage du message d'erreur si nécessaire */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Votre email"
          />
          
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Votre mot de passe"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>

        <div className="register-link">
          <Link to="/register">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
