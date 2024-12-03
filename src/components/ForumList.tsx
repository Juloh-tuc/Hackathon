import React, { useState } from "react";
import "../styles/ForumList.css";

type Discussion = {
  id: number;
  title: string;
  category: string;
  replies: number;
  lastReply: string;
  likes: number;
};

function ForumList({ discussions }: { discussions: Discussion[] }) {
  // Initialisation des likes pour chaque discussion
  const [likeCounts, setLikeCounts] = useState(
    discussions.reduce((acc, discussion) => {
      acc[discussion.id] = discussion.likes;
      return acc;
    }, {} as Record<number, number>)
  );

  // Gestion des likes
  const handleLike = (id: number) => {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  return (
    <div className="forum-list">
      {discussions.map((discussion) => (
        <div key={discussion.id} className="forum-item">
          {/* En-tête de la discussion */}
          <div className="forum-item-header">
            <h3>{discussion.title}</h3>
            <span className="forum-category">{discussion.category}</span>
          </div>

          {/* Informations de la discussion */}
          <div className="forum-item-info">
            <p>{discussion.replies} réponses</p>
            <p>Dernière réponse : {discussion.lastReply}</p>
          </div>

          {/* Bouton pour liker */}
          <div className="forum-actions">
            <button
              onClick={() => handleLike(discussion.id)}
              className="like-button"
            >
              ❤️ {likeCounts[discussion.id]}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForumList;
