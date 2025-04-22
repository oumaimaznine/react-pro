import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });

      alert(' Compte créé avec succès');
      console.log('Réponse Laravel:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur Laravel:', error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        console.error(error);
        alert(" Erreur inconnue");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de famille"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <button type="submit" className="green-btn">Créer</button>
      </form>
    </div>
  );
}

export default RegisterPage;
