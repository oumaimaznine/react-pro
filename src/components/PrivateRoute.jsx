// Importation des hooks et composants nécessaires depuis React Router
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Définition d’un composant `PrivateRoute` qui prend un enfant `children` (composant protégé)
const PrivateRoute = ({ children }) => {
  // Récupère l'objet de localisation actuel (chemin, query, etc.)
  const location = useLocation();

  // Récupère le token JWT depuis le localStorage pour vérifier si l'utilisateur est authentifié
  const token = localStorage.getItem('token');

  // Si aucun token n’est trouvé, l’utilisateur n’est pas connecté
  if (!token) {
    // Construit le chemin complet actuel (utile pour redirection après login)
    const fullPath = location.pathname + location.search + location.hash;

    // Sauvegarde ce chemin dans le localStorage pour y revenir après connexion
    localStorage.setItem('redirectAfterLogin', fullPath);

    // Redirige l'utilisateur non authentifié vers la page de connexion
    return <Navigate to="/connexion" replace />;
  }

  // Si l'utilisateur est authentifié, on affiche le contenu enfant (composant protégé)
  return children;
};

// Export du composant pour pouvoir l’utiliser ailleurs dans l’application
export default PrivateRoute;
