const RoundRow = ({ round, roundIndex, nextRound, theme }) => {
  return (
    <div className="flex items-center gap-8 w-full relative">
      <h2
        className={`text-md font-semibold min-w-[80px] ${
          theme === "dark"
            ? "text-white"
            : theme === "pixel"
            ? "text-gray-900"
            : "text-gray-800"
        }`}
      >
        Round {roundIndex + 1}
      </h2>

      <div className="flex gap-10 flex-wrap relative">
        {round.map((cat, i) => {
          const isEven = i % 2 === 0;
          const next = round[i + 1];

          const matchIndex = Math.floor(i / 2);
          const winner = nextRound[matchIndex];

          const isWinner = winner && cat && winner.id === cat.id;

          return (
            <div key={i} className="relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-full border-4 overflow-hidden shadow-sm ${
                    isWinner
                      ? "border-green-500"
                      : theme === "dark"
                      ? "border-gray-600"
                      : "border-gray-300"
                  } ${
                    theme === "dark"
                      ? "bg-gray-800"
                      : theme === "pixel"
                      ? "bg-pink-100"
                      : "bg-white"
                  }`}
                >
                  {cat ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ?
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm mt-2 text-center w-20 ${
                    theme === "dark"
                      ? "text-white"
                      : theme === "pixel"
                      ? "text-gray-900"
                      : "text-gray-800"
                  }`}
                >
                  {cat ? cat.name : "En attente"}
                </p>
              </div>

              {isEven && next && (
                <div
                  className={`absolute top-1/2 left-full h-0.5 w-10 translate-y-[-50%] ${
                    theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoundRow;
