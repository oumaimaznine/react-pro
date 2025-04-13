import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Pour la navigation avec React Router

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire envoyé:', formData);
    // Vous pouvez envoyer les données à une API ou autre
  };

  return (
    <div className="contacte-page">
      {/* Lien Retour à l'Accueil */}
      <Link to="/" className="return-home">Retour à Accueil</Link>

      {/* Section Contactez-nous */}
      <h2>Contactez-nous</h2>
      <p>Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter en remplissant le formulaire ci-dessous.</p>

      {/* Formulaire de Contact */}
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label>
            Nom :<p> <input type="text" name="name"  placeholder="Votre nom"  value={formData.name}  onChange={handleChange } required  />   
            </p>
          </label>
          <label>
            Email :<p>
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            /></p>
          </label>
          <label>
            Message :<p>
            <textarea
              name="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              required
            /></p>
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
