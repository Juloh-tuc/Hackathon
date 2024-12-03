import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Une lettre Ouverte</h1>

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
