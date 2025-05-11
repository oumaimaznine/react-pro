import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacebookCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      navigate('/profil');
    } else {
      alert("Erreur de connexion via Facebook");
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      Connexion via Facebook en cours...
    </div>
  );
}

export default FacebookCallback;
