import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [quote, setQuote] = useState(""); // État pour le texte de la citation
  const [author, setAuthor] = useState(""); // État pour l'auteur de la citation

  // Fonction pour récupérer une citation aléatoire
  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data && data.data.length > 0) {
          setQuote(data.data[0].quoteText); // Texte de la citation
          setAuthor(data.data[0].quoteAuthor); // Auteur de la citation
        }
      } catch (error) {
        console.error("Erreur lors du fetch de la citation :", error);
      }
    }

    fetchQuote(); // Appel à la fonction
  }, []); // [] signifie que cela s'exécute une seule fois, au montage du composant

  return (
    <div className="home">
      <h1>Une lettre Ouverte</h1>
      <div className="quote-container">
        {quote ? (
          <p>
            "{quote}" <br /> <strong>- {author}</strong>
          </p>
        ) : (
          <p>Chargement de la citation...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
