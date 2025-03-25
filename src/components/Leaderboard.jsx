import { getGlobalStats } from "../utils/stats";

export const Leaderboard = ({ theme }) => {
	const stats = getGlobalStats();

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<h2
				className={`text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"
					}`}
			>
				🏆 Classement des Chats
			</h2>

			{stats.length === 0 ? (
				<p className="text-center text-gray-500">Aucune donnée enregistrée.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full text-left border border-gray-200 rounded overflow-hidden shadow">
						<thead className="bg-gray-100 dark:bg-gray-400">
							<tr>
								<th className="p-2 sm:p-3">#</th>
								<th className="p-2 sm:p-3">Chat</th>
								<th className="p-2 sm:p-3 hidden sm:table-cell">Participations</th>
								<th className="p-2 sm:p-3">Victoires</th>
								<th className="p-2 sm:p-3">Win %</th>
							</tr>
						</thead>
						<tbody>
							{stats.map((cat, index) => {
								const winRate = Math.round((cat.wins / cat.participations) * 100);
								return (
									<tr
										key={cat.id}
										className={
											index % 2 === 0
												? "bg-white dark:bg-white dark:text-black"
												: "bg-gray-50 dark:bg-gray-200 dark:text-black"
										}
									>
										<td className="p-2 sm:p-3 font-semibold">{index + 1}</td>
										<td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
											<img
												src={cat.image}
												alt={cat.name}
												className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
											/>
											<span className="text-sm sm:text-base">{cat.name}</span>
										</td>
										<td className="p-2 sm:p-3 hidden sm:table-cell">{cat.participations}</td>
										<td className="p-2 sm:p-3">{cat.wins}</td>
										<td className="p-2 sm:p-3">{winRate}%</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			<div className="mt-6 sm:mt-8 flex justify-center">
				<button
					className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
					onClick={() => {
						localStorage.removeItem("tournament_history");
						window.location.reload();
					}}
				>
					🔄 Réinitialiser le classement
				</button>
			</div>
		</div>
	);
};

