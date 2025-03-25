export const getGlobalStats = () => {
  const history = JSON.parse(
    localStorage.getItem("tournament_history") || "[]"
  );

  const stats = {};

  history.forEach((tournament) => {
    tournament.participants.forEach((cat) => {
      if (!stats[cat.id]) {
        stats[cat.id] = {
          id: cat.id,
          name: cat.name,
          image: cat.image,
          wins: 0,
          participations: 0,
        };
      }
      stats[cat.id].participations += 1;
    });

    if (stats[tournament.winnerId]) {
      stats[tournament.winnerId].wins += 1;
    }
  });

  return Object.values(stats).sort((a, b) => b.wins - a.wins);
};
