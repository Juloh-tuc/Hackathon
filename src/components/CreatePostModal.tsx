import { useState } from "react";
import "../styles/CreatePostModal.css";

function CreatePostModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (discussion: {
    title: string;
    content: string;
    category: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Général");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      const newDiscussion = {
        title,
        content,
        category,
        id: Date.now(),
        replies: 0,
        lastReply: "",
        likes: 0,
        comments: [],
      };

      const savedDiscussions = localStorage.getItem("forumDiscussions");
      const discussions = savedDiscussions ? JSON.parse(savedDiscussions) : [];
      discussions.push(newDiscussion);

      localStorage.setItem("forumDiscussions", JSON.stringify(discussions));

      onAdd(newDiscussion);

      onClose();
    } else {
      alert("Veuillez remplir tous les champs.");
    }
   };
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Créer un nouveau sujet</h2>
        <input
          type="text"
          placeholder="Titre du sujet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Votre message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Mes émotions">Mes émotions </option>
          <option value="Violence">Violence</option>
          <option value="Harcèlement">Harcèlement </option>
          <option value="Mes pensées"> Mes pensées </option>
          <option value="Appel"> Un appel à l'aide </option>
        </select>
        <div className="modal-actions">
          <button type="button" onClick={handleSubmit}>
            Publier
          </button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
