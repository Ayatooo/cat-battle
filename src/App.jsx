import { useState } from "react";
import confetti from "canvas-confetti";
import cats from "./data/cats";
import Match from "./components/Match";
import Winner from "./components/Winner";
import BracketTree from "./components/BracketTree";

function App() {
  const [catWinner, setCatWinner] = useState(null);
  const [brackets, setBrackets] = useState([shuffleArray(cats)]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [theme, setTheme] = useState("light");
  const [style, setStyle] = useState("classic");

  const currentRound = brackets[currentRoundIndex];
  const catA = currentRound?.[currentMatchIndex];
  const catB = currentRound?.[currentMatchIndex + 1];

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const handleVote = (winner) => {
    const newRound = brackets[currentRoundIndex + 1] || [];
    newRound.push(winner);
    const newBrackets = [...brackets];
    newBrackets[currentRoundIndex + 1] = newRound;

    if (currentMatchIndex + 2 >= currentRound.length) {
      if (newRound.length === 1) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          zIndex: 9999,
        });
        setCatWinner(winner);
        return;
      }
      setBrackets(newBrackets);
      setCurrentRoundIndex(currentRoundIndex + 1);
      setCurrentMatchIndex(0);
    } else {
      setBrackets(newBrackets);
      setCurrentMatchIndex(currentMatchIndex + 2);
    }
  };

  const handleRestart = (customCats = null) => {
    const newCats = customCats || shuffleArray(cats);
    setBrackets([newCats]);
    setCatWinner(null);
    setCurrentRoundIndex(0);
    setCurrentMatchIndex(0);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const uploadedCats = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 16)
      .map((file, index) => ({
        id: 1000 + index,
        name: file.name.replace(/\.[^/.]+$/, ""),
        image: URL.createObjectURL(file),
      }));

    if (uploadedCats.length >= 2) {
      handleRestart(uploadedCats);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : theme === "pixel"
          ? "bg-pink-200 text-black font-mono"
          : "bg-gray-100 text-gray-800"
      }`}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h1 className="text-4xl font-bold text-center mb-10">
        🐱 Battle de Chats
      </h1>

      {/* Controls */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          onClick={() => handleRestart()}
        >
          🔁 Nouveau tournoi
        </button>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="px-3 py-2 rounded border"
        >
          <option value="light">🌞 Clair</option>
          <option value="dark">🌚 Sombre</option>
          <option value="pixel">🕹️ Pixel Art</option>
        </select>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="px-3 py-2 rounded border"
        >
          <option value="classic">🏛️ Classique</option>
          <option value="inverted">🔃 Inversé</option>
          <option value="circular" disabled>
            🔄 Circulaire (bientôt)
          </option>
        </select>
      </div>

      {/* Match or Winner */}
      {catWinner ? (
        <Winner cat={catWinner} />
      ) : (
        <div className="flex justify-center flex-wrap gap-10 mb-16">
          {[catA, catB].map(
            (cat) => cat && <Match key={cat.id} cat={cat} onVote={handleVote} />
          )}
        </div>
      )}
      <BracketTree brackets={brackets} styleType={style} />
    </div>
  );
}

export default App;
