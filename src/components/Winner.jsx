const Winner = ({ cat }) => (
  <div className="flex flex-col items-center mb-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Le grand gagnant est...
    </h2>
    <img
      src={cat.image}
      alt={cat.name}
      className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md"
    />
    <p className="text-xl mt-4 text-gray-800">{cat.name}</p>
  </div>
);

export default Winner;
