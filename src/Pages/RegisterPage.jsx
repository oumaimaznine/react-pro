// Importation des hooks React et des librairies nécessaires
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './RegisterPage.css'; // Fichier de styles pour la page d'inscription

// Définition du composant fonctionnel
function RegisterPage() {
  const navigate = useNavigate(); // Hook pour rediriger après inscription

  // États pour stocker les valeurs des champs du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction déclenchée lors de la soumission du formulaire
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setErrorMessage(''); // Réinitialise le message d'erreur

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      // Requête POST vers l'API Laravel pour créer un nouvel utilisateur
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name,
        email,
        password,
        password_confirmation: confirmPassword, // champ attendu par Laravel
      });
      
      // Sauvegarde les infos de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('emailToVerify', email); // Pour redirection vérification email

      // Redirige vers la page "vérification en attente" après 2 secondes
      setTimeout(() => {
        navigate('/verify-email-pending');
      }, 2000);
    } catch (error) {
      // Gestion des erreurs API
      console.error('Erreur de création:', error.response?.data || error.message);
      setErrorMessage('Erreur lors de la création du compte.');
    }
  };

  // Rendu HTML du formulaire d’inscription
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte</h2>

        {/* Champ nom complet */}
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Champ email */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Champ mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Champ confirmation de mot de passe */}
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Affichage d’un message d’erreur s’il y en a */}
        {errorMessage && (
          <div className="error-under-input">{errorMessage}</div>
        )}

        {/* Bouton d’envoi */}
        <button type="submit" className="green-btn">Créer</button>
      </form>
    </div>
  );
}

// Export du composant pour utilisation dans l'application
export default RegisterPage;
