import RoundRow from "./RoundRow";

const BracketTree = ({ brackets, styleType }) => {
  // On calcule quel ordre afficher
  const isInverted = styleType === "inverted";
  const displayedBrackets = isInverted ? brackets : brackets.slice().reverse();

  return (
    <div className="flex flex-col gap-12 items-start w-full dark:text-white">
      {displayedBrackets.map((round, displayIndex) => {
        // On récupère l'index réel dans le tableau original
        const realIndex = isInverted
          ? displayIndex
          : brackets.length - displayIndex - 1;

        const nextRound = brackets[realIndex + 1] || [];
        const isLastRound = realIndex === brackets.length - 1;

        return (
          <RoundRow
            key={realIndex}
            round={round}
            roundIndex={realIndex}
            nextRound={nextRound}
            isLastRound={isLastRound}
          />
        );
      })}
    </div>
  );
};

export default BracketTree;
