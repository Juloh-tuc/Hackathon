import { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitted(true); 
    setTimeout(() => setIsSubmitted(false), 10000); 
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Nous contacter</h1>
        <p className="contact-description">
          Si tu as besoin d’aide ou souhaites nous poser des questions, n’hésite pas à nous écrire.
          Nous sommes là pour t'aider.
        </p>
        {isSubmitted ? (
          <div className="success-message">
            <h2>Message envoyé !</h2>
            <p>
              Merci de nous avoir contactés. Nous reviendrons vers toi rapidement. Rappelle-toi, tu n’es jamais seul·e.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" placeholder="Ton nom ou pseudo" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Ton email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Raconte-nous tout</label>
              <textarea id="message" placeholder="Ton message" rows={4} required />
            </div>
            <button type="submit" className="form-button">
              Envoyer
            </button>
          </form>
        )}
        <Link to="/" className="back-link">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Contact;
