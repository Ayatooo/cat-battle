const Match = ({ cat, onVote }) => (
  <div
    className="bg-white shadow-lg rounded-2xl w-72 hover:shadow-2xl transition duration-300 cursor-pointer"
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
      <h2 className="text-xl font-semibold text-gray-800">{cat.name}</h2>
    </div>
  </div>
);

export default Match;
