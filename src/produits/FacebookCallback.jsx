import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacebookCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', decodeURIComponent(user)); // important
        navigate('/profil');
      } catch (e) {
        console.error("Erreur lors du stockage des données Facebook:", e);
      }
    } else {
      console.warn("Token ou user manquant dans l'URL (Facebook).");
      navigate('/connexion');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      Connexion via Facebook en cours...
    </div>
  );
}

export default FacebookCallback;
