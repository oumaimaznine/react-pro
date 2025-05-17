import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); // pour afficher les erreurs Laravel

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrors({}); // vider les erreurs avant une nouvelle tentative

    if (password !== confirmPassword) {
      setErrors({ password_confirmation: ["Les mots de passe ne correspondent pas."] });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      window.location.href = '/ProfilePage';
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Laravel errors
      } else {
        setErrors({ general: ["Erreur lors de la création du compte."] });
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>

        {errors.general && <p className="error">{errors.general[0]}</p>}

        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="error">{errors.name[0]}</p>}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error">{errors.email[0]}</p>}

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error">{errors.password[0]}</p>}

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.password_confirmation && <p className="error">{errors.password_confirmation[0]}</p>}

        <button type="submit" className="green-btn">Créer</button>
      </form>
    </div>
  );
}

export default RegisterPage;
