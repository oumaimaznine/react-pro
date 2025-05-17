import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ProductReview.css';

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [expanded, setExpanded] = useState(null); // Pour "Voir plus"

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}/reviews`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8000/api/reviews', {
        product_id: productId,
        rating,
        comment,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess("Avis ajouté !");
      setComment('');
      setRating(5);
      setShowForm(false);

      const res = await axios.get(`http://localhost:8000/api/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (err) {
      setError("Erreur : impossible d’ajouter l’avis.");
    }
  };

  return (
    <div className="review-container">
      <div className="review-header-top">
        <h3 className="review-title" onClick={() => setShowReviews(!showReviews)}>
          Avis sur ce produit ({reviews.length}) {showReviews ? '▼' : '▶'}
        </h3>

        <button className="open-review-btn" onClick={() => setShowForm(true)}>
          Donner un avis
        </button>
      </div>

      {showReviews && (
        <>
          {reviews.length === 0 ? (
            <p>Aucun avis pour ce produit</p>
          ) : (
            <div className="reviews-wrapper no-scrollbar">
              {reviews.map((r, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="avatar-circle">
                      {r.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="review-meta">
                      <div className="review-name-line">
                        <strong>{r.user?.name?.slice(0, 2) + '***' + r.user?.name?.slice(-1)}</strong>
                        <span className="review-date">
                          le {new Date(r.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="star-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>{i < r.rating ? '★' : '☆'}</span>
                        ))}
                      </div>

                      {/*  Commentaire + Voir plus */}
                      <p className="review-comment">
                        {!r.comment || expanded === index || r.comment.length < 150
                          ? r.comment
                          : r.comment.slice(0, 150) + '...'}
                      </p>

                      {r.comment && r.comment.length >= 150 && (
                        <button
                          className="voir-plus"
                          onClick={() =>
                            setExpanded(expanded === index ? null : index)
                          }
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

          <Modal
            isOpen={showForm}
            onRequestClose={() => setShowForm(false)}
            contentLabel="Donner un avis"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <h2>Donner votre avis</h2>

            <form onSubmit={handleSubmit} className="review-form">
              {success && <p className="success">{success}</p>}
              {error && <p className="error">{error}</p>}

              <label>Note (1 à 5) :</label>
              <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>

              <label>Votre avis :</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Votre commentaire ici..."
              />

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

export default ProductReview;
