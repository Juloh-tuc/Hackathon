import { Link } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Nous contacter</h1>
        <p className="contact-description">
          Si tu as besoin d’aide ou souhaites nous poser des questions,
          n’hésites pas à nous écrire. Nous sommes là pour t'aider.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" placeholder="Ton nom ou pseudo" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Ton email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Raconte nous tout</label>
            <textarea
              id="message"
              placeholder="Ton message"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="form-button">
            Envoyer
          </button>
        </form>
        <Link to="/" className="back-link">
           Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;