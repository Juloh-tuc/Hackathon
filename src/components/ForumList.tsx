import { useEffect, useState, useRef } from "react";
import "../styles/ForumList.css";

type Discussion = {
  id: number;
  title: string;
  category: string;
  replies: number;
  lastReply: string;
  likes: number;
  content: string;
  comments: string[]; // Propriété pour les commentaires
};

function ForumList({ discussions }: { discussions: Discussion[] }) {
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [commentText, setCommentText] = useState<Record<number, string>>({});
  const [allComments, setAllComments] = useState<Record<number, string[]>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [storedDiscussions, setStoredDiscussions] = useState<Discussion[]>([]);
  const commentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Charger les discussions et commentaires depuis Local Storage ou initialiser avec les valeurs par défaut
  useEffect(() => {
    const savedComments = localStorage.getItem("forumComments");
    if (savedComments) {
      setAllComments(JSON.parse(savedComments));
    } else {
      const initialComments = discussions.reduce(
        (acc, discussion) => {
          acc[discussion.id] = discussion.comments || [];
          return acc;
        },
        {} as Record<number, string[]>,
      );
      setAllComments(initialComments);
    }

    // Charger les discussions depuis Local Storage
    const savedDiscussions = localStorage.getItem("forumDiscussions");
    if (savedDiscussions) {
      setStoredDiscussions(JSON.parse(savedDiscussions));
    } else {
      setStoredDiscussions(discussions);
    }

    // Initialisation des likes
    const initialLikes = discussions.reduce(
      (acc, discussion) => {
        acc[discussion.id] = discussion.likes;
        return acc;
      },
      {} as Record<number, number>,
    );
    setLikeCounts(initialLikes);
  }, [discussions]);

  // Sauvegarder les commentaires dans Local Storage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem("forumComments", JSON.stringify(allComments));
  }, [allComments]);

  // Sauvegarder les discussions dans Local Storage à chaque mise à jour des likes
  useEffect(() => {
    localStorage.setItem("forumDiscussions", JSON.stringify(storedDiscussions));
  }, [storedDiscussions]);

  // Gestion des likes
  const handleLike = (id: number) => {
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setStoredDiscussions((prevDiscussions) =>
      prevDiscussions.map((discussion) =>
        discussion.id === id
          ? { ...discussion, likes: (discussion.likes || 0) + 1 }
          : discussion,
      ),
    );
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
      [id]: !prev[id], // Inverse l'état actuel
    }));
  };

  // Gestion de la fermeture des commentaires lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node) {
        const isClickInside = Object.values(commentRefs.current).some((ref) =>
          ref?.contains(event.target as Node),
        );
        if (!isClickInside) {
          setShowComments({});
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="forum-list">
      {storedDiscussions.map((discussion) => (
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
            <button type="button" onClick={() => toggleComments(discussion.id)}>
              🗨️ {showComments[discussion.id] ? "Masquer" : "Voir"} les
              commentaires
            </button>
          </div>

          {/* Liste des commentaires (affichés si showComments est vrai) */}
          {showComments[discussion.id] && (
            <div
              ref={(el) => {
                commentRefs.current[discussion.id] = el;
              }}
              className="forum-comments"
            >
              {allComments[discussion.id]?.map((comment, index) => (
                <div
                  key={`${discussion.id}-${index}`}
                  className="forum-comment"
                >
                  <p>🗨️ {comment}</p>
                </div>
              ))}

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
            </div>
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
