import React, { useState } from "react";
import "./../styles/ForumHeader.css";

function ForumHeader({
  onOpenModal,
  onSearch,
}: {
  onOpenModal: () => void;
  onSearch: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Transmet la recherche au composant parent
  };

  return (
    <div className="forum-header">
      <h1>Forum</h1>
      <div className="forum-controls">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher une discussion..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Rechercher dans le forum"
        />

        {/* Bouton "Nouveau sujet" */}
        <button
          className="new-topic-button"
          onClick={onOpenModal}
          aria-label="Créer un nouveau sujet"
        >
          Nouveau sujet
        </button>
      </div>
    </div>
  );
}

export default ForumHeader;
