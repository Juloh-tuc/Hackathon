
import { useState } from "react";
import "../../styles/Forum.css";
import CreatePostModal from "../../components/CreatePostModal";
import ForumHeader from "../../components/ForumHeader";
import ForumList from "../../components/ForumList";
import ForumSidebar from "../../components/ForumSidebar";

type Discussion = {
  id: number;
  title: string;
  content: string;
  category: string;
  replies: number;
  lastReply: string;
  likes: number;
  comments: string[];
};

function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Gestion de la modale
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "J'ai été victime d'une agression",
      content: "Lors d'une balade j'ai été aborder d'une façon brutale",
      category: "agression",
      replies: 5,
      lastReply: "Il y a 2 heures",
      likes: 10,
      comments: [
        "Nous sommes envahis par la violence",
        "Je suis désolé pour vous",
      ],
    },
    {
      id: 2,
      title: "menaces",
      content:
        "j'ai été victime de menaces par plusieurs individu malintentionnés",
      category: "Agression",
      replies: 2,
      lastReply: "Hier",
      likes: 8,
      comments: ["bon courage", "je suis de tout coeur avec vous"],
    },
  ]);

  // Fonction pour ouvrir/fermer la modale
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fonction pour ajouter une nouvelle discussion
  const addDiscussion = (
    newDiscussion: Omit<
      Discussion,
      "id" | "replies" | "lastReply" | "likes" | "comments"
    >,
  ) => {
    const newDiscussionWithDefaults: Discussion = {
      ...newDiscussion,
      id: discussions.length + 1,
      replies: 0,
      lastReply: "À l'instant",
      likes: 0,
      comments: [],
    };
    setDiscussions((prevDiscussions) => [
      ...prevDiscussions,
      newDiscussionWithDefaults,
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
          <ForumList
            discussions={discussions.filter((discussion) =>
              discussion.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )}
          />
        </div>

        {/* Barre latérale */}
        <aside className="forum-sidebar-container">
          <ForumSidebar />
        </aside>
      </div>

      {/* Modale pour créer un nouveau sujet */}
      {isModalOpen && (
        <CreatePostModal onClose={closeModal} onAdd={addDiscussion} />
      )}
    </div>
  );
}

export default Forum;
