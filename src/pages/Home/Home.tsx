import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

interface Quote {
  q: string;
  a: string;
}

function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get("https://zenquotes.io/api/quotes");
        const quotesData = response.data.map(
          (quote: { q: string; a: string }) => ({
            q: quote.q,
            a: quote.a,
          })
        );
        setQuotes(quotesData);
      } catch (err) {
        setError("Impossible de récupérer les citations.");
        console.error(err);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="home">
      <div className="quote-marquee">
        {quotes.length > 0 ? (
          <div className="marquee">
            {/* Dupliquer les citations pour l'effet de boucle */}
            {[...quotes, ...quotes].map((quote, index) => (
              <span key={`${index}-${quote.q}`} className="marquee-item">
                "{quote.q}" - {quote.a}
              </span>
            ))}
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Chargement des citations...</p>
        )}
      </div>

      <h1>Une Lettre Ouverte</h1>

      <div className="aboutuscontainer">
        <h2 className="aboutustitle">Vous avez besoin de parler ?</h2>
        <p>
          Notre application a pour mission de soutenir et d’accompagner les
          victimes de harcèlement en leur offrant un espace sécurisé et
          bienveillant. <br />
          Dans un environnement similaire à un réseau social, les victimes
          peuvent se connecter entre elles pour partager leurs expériences,
          trouver du soutien, et échanger des conseils. <br />
          De plus, elles ont la possibilité de contacter directement nos équipes
          de psychologues volontaires via une messagerie privée. <br />
          Notre objectif est de créer un réseau solidaire où chacun peut trouver
          l'écoute et l’aide nécessaire pour surmonter ses difficultés.
        </p>
      </div>
    </div>
  );
}

export default Home;
