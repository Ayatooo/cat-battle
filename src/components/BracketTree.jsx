import { RoundRow } from "./RoundRow";

export const BracketTree = ({ brackets, styleType, theme }) => {
  const isInverted = styleType === "inverted";
  const displayedBrackets = isInverted ? brackets : brackets.slice().reverse();

  return (
    <div className="flex flex-col gap-12 items-start w-full dark:text-white">
      {displayedBrackets.map((round, displayIndex) => {
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
            theme={theme}
          />
        );
      })}
    </div>
  );
};
