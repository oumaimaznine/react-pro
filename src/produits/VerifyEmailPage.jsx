import React, { useState } from 'react';
import axios from 'axios';
import './VerifyEmailPage.css';
import { useNavigate } from 'react-router-dom';

function VerifyEmailPage() {
  const email = localStorage.getItem('emailToVerify');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post('http://127.0.0.1:8000/api/verify-email', {
        email,
        code,
      });

      setSuccess(true);
      setMessage('Email vérifié avec succès.');
      localStorage.removeItem('emailToVerify');

      setTimeout(() => {
        navigate('/');
      }, 2000); 
    } catch (error) {
      setSuccess(false);
      setMessage(' Code invalide ou expiré.');
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h1 className="title">NOURRITURE DES FIDÈLES</h1>
        <h3>Saisir le code</h3>
        <p>Envoyé à <strong>{email}</strong></p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="code-input"
          />
          <button type="submit" className="submit-btn">Soumettre</button>
        </form>

        {message && (
          <div className={`verify-message ${success ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <p className="alt-email">Se connecter avec une autre adresse e-mail</p>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
