import { Link } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Nous contacter</h1>
      <p className="contact-description">
        Si vous avez besoin d’aide ou souhaitez nous poser des questions,
        n’hésitez pas à nous écrire. Nous sommes là pour vous aider.
      </p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" placeholder="Votre nom" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Votre email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Votre message"
            rows={4}
          />
        </div>
        <button type="submit" className="form-button">
          Envoyer
        </button>
      </form>
      <Link to="/" className="back-link">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Contact;
