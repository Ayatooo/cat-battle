export const Match = ({ cat, onVote, theme }) => (
  <div
    className={`shadow-lg rounded-2xl w-72 hover:shadow-2xl transition duration-300 cursor-pointer ${
      theme === "dark"
        ? "bg-gray-800"
        : theme === "pixel"
        ? "bg-pink-100"
        : "bg-white"
    }`}
    onClick={() => onVote(cat)}
  >
    <div className="w-full h-72 overflow-hidden rounded-t-2xl">
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-4 text-center">
      <h2
        className={`text-xl font-semibold ${
          theme === "dark"
            ? "text-white"
            : theme === "pixel"
            ? "text-gray-900"
            : "text-gray-800"
        }`}
      >
        {cat.name}
      </h2>
    </div>
  </div>
);

