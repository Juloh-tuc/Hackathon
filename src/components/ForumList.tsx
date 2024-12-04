import { useEffect, useRef, useState } from "react";
import "../styles/ForumList.css";

type Discussion = {
  id: number;
  title: string;
  category: string;
  replies: number;
  lastReply: string;
  likes: number;
  content: string;
  comments: string[]; // Ajout de la propriété "comments" pour les discussions
};

function ForumList({ discussions }: { discussions: Discussion[] }) {
  // Initialisation des likes pour chaque discussion
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [allComments, setAllComments] = useState<Record<number, string[]>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const commentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialisation des likes
    const updatedLikes = discussions.reduce(
      (acc, discussion) => {
        acc[discussion.id] = discussion.likes;
        return acc;
      },
      {} as Record<number, number>,
    );
    setLikeCounts(updatedLikes);

    // Initialisation des commentaires
    const initialComments = discussions.reduce(
      (acc, discussion) => {
        acc[discussion.id] = discussion.comments || [];
        return acc;
      },
      {} as Record<number, string[]>,
    );
    setAllComments(initialComments);
  }, [discussions]);

  // Gestion des likes
  const handleLike = (id: number) => {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Gestion des ajouts de commentaires
  const handleAddComment = (id: number) => {
    if (commentText[id]?.trim()) {
      setAllComments((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), commentText[id]],
      }));
      setCommentText((prev) => ({ ...prev, [id]: "" })); // Vide le champ de saisie
    }
  };

  // Gestion de l'affichage des commentaires
  const toggleComments = (id: number) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id], // Inverse l'état actuel (afficher/masquer)
    }));
  };
  // Gestion de la fermeture des commentaires au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commentRef.current &&
        !commentRef.current.contains(event.target as Node)
      ) {
        setShowComments({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="forum-list">
      {discussions.map((discussion) => (
        <div key={discussion.id} className="forum-item">
          {/* En-tête de la discussion */}
          <div className="forum-item-header">
            <h3>{discussion.title}</h3>
            <span className="forum-category">{discussion.category}</span>
          </div>

          {/* Contenu du message */}
          <p className="forum-content">{discussion.content}</p>

          {/* Informations de la discussion */}
          <div className="forum-item-info">
            <p>{allComments[discussion.id]?.length || 0} commentaires</p>
            <p>Dernière réponse : {discussion.lastReply}</p>
          </div>

          {/* Icône pour dérouler les commentaires */}
          <div className="forum-comment-toggle">
            <button
              type="button"
              onClick={() => {
                if (typeof discussion.id === "number") {
                  toggleComments(discussion.id);
                }
              }}
            >
              🗨️ Voir les commentaires
            </button>
          </div>

          {/* Liste des commentaires (affichés si showComments est vrai) */}
          {showComments[discussion.id] && (
            <>
              <div className="forum-comments">
                {allComments[discussion.id]?.map((comment) => (
                  <div key={comment} className="forum-comment">
                    <p>🗨️ {comment}</p>
                  </div>
                ))}
              </div>

              {/* Ajout d'un commentaire */}
              <div className="forum-comment-input">
                <input
                  type="text"
                  placeholder="Écrire un commentaire..."
                  value={commentText[discussion.id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [discussion.id]: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => handleAddComment(discussion.id)}
                >
                  Répondre
                </button>
              </div>
            </>
          )}

          {/* Bouton pour liker */}
          <div className="forum-actions">
            <button
              type="button"
              onClick={() => handleLike(discussion.id)}
              className="like-button"
            >
              ❤️ {likeCounts[discussion.id] || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ForumList;
