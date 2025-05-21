import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profil';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log("oken saved:", response.data.token);
        console.log("User saved:", response.data.user);

        const manualRedirect = localStorage.getItem("redirectAfterLogin");
        localStorage.removeItem("redirectAfterLogin");

        navigate(manualRedirect || from, { replace: true });
     
      } else {
        setError('Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur login:', error);
      setError('Erreur de connexion. Vérifiez vos informations.');
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

        {error && <p className="error-message">{error}</p>}

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

        <p className="register-link">
          Vous n’avez pas de compte ?{' '}
          <a href="/register">Inscrivez-vous</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
