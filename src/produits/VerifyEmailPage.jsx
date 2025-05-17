import React, { useState } from 'react';
import axios from 'axios';

function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/verify-email', {
        email,
        code
      });

      setMessage(response.data.message);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      if (error.response && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Erreur lors de la vérification");
      }
    }
  };

  return (
    <div className="verification-container" style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Vérification de l'adresse email</h2>

      <label>Email :</label>
      <input
        type="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <label>Code de vérification :</label>
      <input
        type="text"
        placeholder="Code reçu par email"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={handleVerify} style={{ width: '100%' }}>
        Vérifier
      </button>

      <p style={{ marginTop: 10, color: success ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}

export default VerifyEmailPage;
