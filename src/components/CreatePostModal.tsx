import React, { useState } from "react";
import "../styles/CreatePostModal.css";

function CreatePostModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (discussion: { title: string; content: string; category: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Général");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onAdd({ title, content, category }); // Transmet les données au parent
      onClose(); // Ferme la modale
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
          <option value="Général">Général</option>
          <option value="Technique">Technique</option>
          <option value="Design">Design</option>
        </select>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Publier</button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
