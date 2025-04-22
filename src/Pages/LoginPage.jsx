import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      alert('Connexion réussie');
      console.log(response.data);

      // ✅ التخزين + التوجيه
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = "/personnels";
    } catch (error) {
      if (error.response) {
        console.error('Erreur Laravel:', error.response.data);
        alert("Erreur Laravel : " + JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.request);
        alert("Aucune réponse du serveur (peut-être Laravel n'est pas lancé)");
      } else {
        console.error('Erreur inconnue:', error.message);
        alert("Erreur : " + error.message);
      }
    }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="forgot-password"
          onClick={() => alert('Lien de réinitialisation bientôt dispo')}
        >
          Mot de passe oublié ?
        </button>

        <button type="submit" className="green-btn">Connexion</button>

        <p className="link-register">
          Vous n'avez pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
