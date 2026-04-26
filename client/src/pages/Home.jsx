// import tailwindcss from "@tailwindcss/vite"
import { getMoreData } from "../api/index.js";
import bgImage from "../assets/Home-bg.png";
import Navbar from "../components/Navbar.jsx";
import SnippetCard from "../components/SnippetCard.jsx";
import AddSnippetCard from "../components/AddSnippetCard.jsx";
import { useState } from "react";
import AddSnippetForm from "../components/AddSnippetForm.jsx";
import UseSnippets from "../hooks/useSnippets.js";
import SnippetThread from "../components/SnippetThread.jsx";

const Home = () => {
  // console.log(dataOfSnippetsFOrThisPage, "HOME");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const { snippets, loading, error, hasMore, loadMore, refresh } =
    UseSnippets();

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* rest of page */}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        <AddSnippetCard
          onClick={() => {
            setShowAddForm(true);
            console.log(showAddForm);
          }}
        />

        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet._id}
            snippet={snippet}
            onClick={() => {
              console.log("CLicked", snippet._id);
              setSelectedSnippet(snippet);
            }}
          />
        ))}
      </div>
      {hasMore && !loading && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="px-8 py-3 rounded text-sm"
            style={{
              backgroundColor: "#c8a97e",
              color: "#2C1A0E",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            Load more
          </button>
        </div>
      )}
      {showAddForm && (
        <AddSnippetForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            console.log("snippet added");
          }}
        />
      )}
      {selectedSnippet && (
        <SnippetThread
          snippet={selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
        />
      )}
    </div>
  );
};

export default Home;
