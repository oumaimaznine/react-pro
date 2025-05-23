// Importation de React et des hooks nécessaires
import React, { useEffect, useState } from 'react';
// Importation d'Axios pour les requêtes API
import axios from 'axios';
// Importation de la librairie Modal pour la fenêtre modale
import Modal from 'react-modal';
// Importation du fichier CSS pour le style des avis
import './ProductReview.css';

// Composant d'avis produit qui prend en prop l'ID du produit concerné
const ProductReview = ({ productId }) => {
  // États pour gérer les données d'avis
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5); // Valeur par défaut 5 étoiles
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); // Affiche le formulaire modal
  const [showReviews, setShowReviews] = useState(true); // Affiche ou masque les avis
  const [expanded, setExpanded] = useState(null); // Gère l’expansion du commentaire (voir plus)

  // Charger les avis dès que le composant est monté ou que le produit change
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}/reviews`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [productId]);

  // Gestion de la soumission du formulaire d'avis
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Validation de la longueur du commentaire
    if (comment.length > 250) {
      setError("Votre avis ne peut pas dépasser 250 caractères.");
      return;
    }

    try {
      // Envoi de l'avis au backend
      await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        product_id: productId,
        rating,
        comment,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Si succès, réinitialiser les champs et recharger les avis
      setSuccess("Avis ajouté !");
      setError('');
      setComment('');
      setRating(5);
      setShowForm(false);

      // Recharger les avis après ajout
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      setError("Erreur : impossible d’ajouter l’avis.");
    }
  };

  return (
    <div className="review-container">
      {/* En-tête avec titre et bouton "Donner un avis" */}
      <div className="review-header-top">
        <h3 className="review-title" onClick={() => setShowReviews(!showReviews)}>
          Avis sur ce produit ({reviews.length}) {showReviews ? '▼' : '▶'}
        </h3>
        <button className="open-review-btn" onClick={() => setShowForm(true)}>
          Donner un avis
        </button>
      </div>

      {/* Affichage des avis si activé */}
      {showReviews && (
        <>
          {/* Si aucun avis */}
          {reviews.length === 0 ? (
            <p>Aucun avis pour ce produit</p>
          ) : (
            <div className="reviews-wrapper no-scrollbar">
              {reviews.map((r, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    {/* Avatar avec initiale */}
                    <div className="avatar-circle">
                      {r.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>

                    {/* Infos utilisateur et note */}
                    <div className="review-meta">
                      <div className="review-name-line">
                        <strong>{r.user?.name?.slice(0, 2) + '***' + r.user?.name?.slice(-1)}</strong>
                        <span className="review-date">
                          le {new Date(r.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      {/* Affichage des étoiles */}
                      <div className="star-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>{i < r.rating ? '★' : '☆'}</span>
                        ))}
                      </div>

                      {/* Affichage du commentaire (avec bouton voir plus si long) */}
                      <p className="review-comment">
                        {r.comment && (
                          expanded === index
                            ? r.comment
                            : r.comment.length <= 150
                              ? r.comment
                              : r.comment.slice(0, 150) + '...'
                        )}
                      </p>

                      {r.comment && r.comment.length > 150 && (
                        <button
                          className="voir-plus"
                          onClick={() => setExpanded(expanded === index ? null : index)}
                        >
                          {expanded === index ? 'Voir moins' : 'Voir plus'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal pour laisser un nouvel avis */}
          <Modal
            isOpen={showForm}
            onRequestClose={() => setShowForm(false)}
            contentLabel="Donner un avis"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <h2>Donner votre avis</h2>

            <form onSubmit={handleSubmit} className="review-form">
              {/* Messages de succès ou d’erreur */}
              {success && <p className="success">{success}</p>}
              {error && <p className="error">{error}</p>}

              {/* Sélection de la note */}
              <label>Note (1 à 5) :</label>
              <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>

              {/* Zone de texte pour le commentaire */}
              <label>Votre avis :</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Votre commentaire ici..."
                maxLength={250}
              />
              <p className="char-counter">{comment.length}/250</p>

              {/* Boutons de la modale */}
              <div className="modal-button-group">
                <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
                <button type="submit">Envoyer</button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

// Export du composant pour l'utiliser ailleurs
export default ProductReview;
