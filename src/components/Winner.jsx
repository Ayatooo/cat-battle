const Winner = ({ cat, theme }) => (
  <div className="flex flex-col items-center mb-10">
    <h2
      className={`text-2xl font-semibold mb-4 ${
        theme === "dark"
          ? "text-white"
          : theme === "pixel"
          ? "text-gray-900"
          : "text-gray-800"
      }`}
    >
      Le grand gagnant est...
    </h2>
    <img
      src={cat.image}
      alt={cat.name}
      className={`w-40 h-40 object-cover rounded-full border-4 shadow-md ${
        theme === "dark" ? "border-gray-700" : "border-white"
      }`}
    />
    <p
      className={`text-xl mt-4 ${
        theme === "dark"
          ? "text-white"
          : theme === "pixel"
          ? "text-gray-900"
          : "text-gray-800"
      }`}
    >
      {cat.name}
    </p>
  </div>
);

export default Winner;
