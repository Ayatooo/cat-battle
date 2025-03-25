import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { cats } from "./data/cats";
import { Match } from "./components/Match";
import { Winner } from "./components/Winner";
import { BracketTree } from "./components/BracketTree";
import { Leaderboard } from "./components/Leaderboard";

export function App() {
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
        saveTournamentResult(winner, brackets);
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

  const saveTournamentResult = (winner, brackets) => {
    const history = JSON.parse(
      localStorage.getItem("tournament_history") || "[]"
    );

    const participants = brackets[0].map((cat) => ({
      id: cat.id,
      name: cat.name,
      image: cat.image,
    }));

    history.push({
      date: new Date().toISOString(),
      winnerId: winner.id,
      winnerName: winner.name,
      participants,
    });

    localStorage.setItem("tournament_history", JSON.stringify(history));
  };

  return (
    <Router>
      <div
        className={`min-h-screen p-6 ${
          theme === "dark"
            ? "bg-gray-900"
            : theme === "pixel"
            ? "bg-pink-200"
            : "bg-white"
        }`}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1
          className={`text-4xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          🐱 Battle de Chats
        </h1>

        {/* Navigation */}
        <div className="flex justify-center gap-6 mb-6">
          <Link
            to="/"
            className={`font-semibold underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Tournoi
          </Link>
          <Link
            to="/classement"
            className={`font-semibold underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Classement
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex justify-center gap-6 mb-10">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                    onClick={() => handleRestart()}
                  >
                    🔁 Nouveau tournoi
                  </button>

                  <div className="flex flex-col">
                    <label
                      htmlFor="theme-select"
                      className={`text-s mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      Thème du jeu
                    </label>
                    <select
                      id="theme-select"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className={`px-3 py-2 rounded border ${
                        theme === "dark"
                          ? "bg-gray-800 text-white border-gray-700"
                          : "bg-white text-gray-900 border-gray-300"
                      }`}
                    >
                      <option value="light">🌞 Clair</option>
                      <option value="dark">🌚 Sombre</option>
                      <option value="pixel">🕹️ Pixel Art</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="style-select"
                      className={`text-s mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      Style d'affichage des rounds
                    </label>
                    <select
                      id="style-select"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className={`px-3 py-2 rounded border ${
                        theme === "dark"
                          ? "bg-gray-800 text-white border-gray-700"
                          : "bg-white text-gray-900 border-gray-300"
                      }`}
                    >
                      <option value="classic">🏛️ Classique</option>
                      <option value="inverted">🔃 Inversé</option>
                      <option value="circular" disabled>
                        🔄 Circulaire (bientôt)
                      </option>
                    </select>
                  </div>
                </div>

                {catWinner ? (
                  <Winner cat={catWinner} theme={theme} />
                ) : (
                  <div className="flex justify-center flex-wrap gap-10 mb-16">
                    {[catA, catB].map(
                      (cat) =>
                        cat && (
                          <Match
                            key={cat.id}
                            cat={cat}
                            onVote={handleVote}
                            theme={theme}
                          />
                        )
                    )}
                  </div>
                )}

                <BracketTree
                  brackets={brackets}
                  styleType={style}
                  theme={theme}
                />
              </>
            }
          />

          <Route path="/classement" element={<Leaderboard theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}
