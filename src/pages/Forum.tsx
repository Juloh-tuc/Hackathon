import React, { useState } from "react";
import "../styles/Forum.css";
import ForumHeader from "../components/ForumHeader";
import ForumList from "../components/ForumList";
import CreatePostModal from "../components/CreatePostModal";
import ForumSidebar from "../components/ForumSidebar";

type Discussion = {
  id: number;
  title: string;
  content: string;
  category: string;
  replies: number;
  lastReply: string;
  likes: number;
};

function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestion de la modale
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "Comment améliorer le projet React ?",
      content: "Partagez vos idées pour améliorer ce projet.",
      category: "Technique",
      replies: 5,
      lastReply: "Il y a 2 heures",
      likes: 10,
    },
    {
      id: 2,
      title: "Idées pour l'interface utilisateur",
      content: "Des suggestions pour un design moderne ?",
      category: "Design",
      replies: 2,
      lastReply: "Hier",
      likes: 8,
    },
  ]);

  // Fonction pour ouvrir/fermer la modale
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fonction pour ajouter une nouvelle discussion
  const addDiscussion = (newDiscussion: Omit<Discussion, "id" | "replies" | "lastReply" | "likes">) => {
    setDiscussions((prevDiscussions) => [
      ...prevDiscussions,
      {
        ...newDiscussion,
        id: prevDiscussions.length + 1,
        replies: 0,
        lastReply: "À l'instant",
        likes: 0,
      },
    ]);
    closeModal();
  };

  // Gestion de la recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="forum-page">
      {/* Header avec barre de recherche et bouton "Nouveau sujet" */}
      <ForumHeader onOpenModal={openModal} onSearch={handleSearch} />

      <div className="forum-body">
        {/* Liste des discussions */}
        <div className="forum-main">
          <ForumList discussions={discussions.filter((discussion) =>
            discussion.title.toLowerCase().includes(searchQuery.toLowerCase())
          )} />
        </div>

        {/* Barre latérale */}
        <aside className="forum-sidebar-container">
          <ForumSidebar />
        </aside>
      </div>

      {/* Modale pour créer un nouveau sujet */}
      {isModalOpen && <CreatePostModal onClose={closeModal} onAdd={addDiscussion} />}
    </div>
  );
}

export default Forum;
