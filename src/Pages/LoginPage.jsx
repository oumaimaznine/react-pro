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
      console.log("LOGIN RESPONSE:", response.data);
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert('Connexion réussie !');

      
        window.location.href = '/ProfilePage';
      } else {
        alert('Erreur: Données de connexion invalides.');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error.response?.data || error.message);
      alert('Erreur de connexion. Vérifiez vos informations.');
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
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="green-btn">
          Connexion
        </button>

        <p className="link-register">
          Vous n'avez pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
