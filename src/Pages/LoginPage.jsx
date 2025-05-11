import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Connexion réussie !');
        window.location.href = '/profil';
      } else {
        alert('Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur login:', error);
      alert('Erreur de connexion. Vérifiez vos infos.');
    }
  };

  const loginWithFacebook = () => {
    window.location.href = 'http://127.0.0.1:8000/api/login/facebook';
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://127.0.0.1:8000/api/auth/google';
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion / S’inscrire</h2>

        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="main-btn">Connexion</button>

        <div className="or-divider">
          <span></span>
          <p>Ou</p>
          <span></span>
        </div>

        <div className="social-login">
          <button
            type="button"
            className="social-btn facebook"
            onClick={loginWithFacebook}
          >
            <img src="/icons/facebook.png" alt="Facebook" />
            Continuer avec Facebook
          </button>

          <button
            type="button"
            className="social-btn google"
            onClick={loginWithGoogle}
          >
            <img src="/icons/google.png" alt="Google" />
            Continuer avec Google
          </button>
        </div>

        <p className="terms-text">
          En continuant, vous acceptez notre{' '}
          <a href="#">Politique de confidentialité</a> &{' '}
          <a href="#">Conditions Générales</a>.
        </p>

        <p className="register-link">
          Vous n’avez pas de compte ?{' '}
          <a href="/register">Inscrivez-vous</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
