import React from "react";
import "../styles/ForumSidebar.css";

const popularDiscussions = [
  { id: 1, title: "10 Favs ❤️", replies: 96, time: "Il y a 1 minute" },
  { id: 2, title: "Vues, vues, vues 👀", replies: 197, time: "Il y a 5 minutes" },
  { id: 3, title: "Recherche habits garçons 10 ans", replies: 56, time: "Il y a 1 heure" },
];

function ForumSidebar() {
  return (
    <div className="forum-sidebar">
      <h4>Discussions populaires</h4>
      <ul>
        {popularDiscussions.map((discussion) => (
          <li key={discussion.id}>
            <p>{discussion.title}</p>
            <span>{discussion.replies} réponses • {discussion.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForumSidebar;
