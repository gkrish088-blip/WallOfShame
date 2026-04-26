import { useRef } from "react";

const SnippetCard = ({ snippet, onClick }) => {
  // rotation is calculated once and never changes
  const rotation = useRef(Math.random() * 16 - 8);

  return (
    <>
      <div
        onClick={onClick}
        className="relative cursor-pointer p-5 rounded "
        style={{
          backgroundColor: "#f5e6c8",
          transform: `rotate(${rotation.current}deg)`,
          transition: "transform 0.2s ease",
          fontFamily: "JetBrains Mono, monospace",
          minHeight: "200px",
         
        
         
        }}
      >
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          style={{
            backgroundColor: "#8B6914",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        />

        <span
          className="absolute top-2 right-2 text-xs px-2 py-1 rounded"
          style={{ backgroundColor: "#2C1A0E", color: "#c8a97e" }}
        >
          {snippet.snippetLanguage}
        </span>

        <div className="flex items-center gap-2 mt-4">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${snippet.aliasName}`}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs" style={{ color: "#5a3e1b" }}>
            {snippet.aliasName}
          </span>
        </div>
        <pre
          className="text-xs mt-4 mb-2 overflow-hidden"
          style={{ maxHeight: "80px", color: "#2C1A0E" }}
        >
          {snippet.snippetCode}
        </pre>

        {snippet.description  && (
          <p className="text-xs mt-2" style={{ color: "#5a3e1b" }}>
            {snippet.description}
          </p>
        )}
      </div>
    </>
  );
};

export default SnippetCard;
