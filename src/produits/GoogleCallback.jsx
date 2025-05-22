import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const user = query.get('user');

    if (token && user) {
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', decodeURIComponent(user)); 
        navigate('/');
      } catch (e) {
        console.error("Erreur lors du stockage des données Google:", e);
      }
    } else {
      console.warn("Aucun token ou user trouvé dans l'URL.");
    }
  }, );

  return <p>Connexion via Google en cours...</p>;
}

export default GoogleCallback;
