import { Solver } from "../types";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function getPickScore(pick: string) {
  switch (pick) {
    case "A":
    case "X":
      // rock
      return 1;
    case "B":
    case "Y":
      // paper
      return 2;
    case "C":
    case "Z":
      // scissor
      return 3;
    default:
      throw Error(`'${pick} is not an allowed pick`);
  }
}

function getOutcome(me: number, opponent: number) {
  return mod(me - opponent, 3);
}

function getOutcomeScore(outcome: number) {
  if (outcome === 0) {
    // tie
    return 3;
  }
  if (outcome === 1) {
    // win
    return 6;
  }
  // loss
  return 0;
}

export const day02: Solver = (lines) => {
  let part1 = 0;
  let part2 = 0;

  for (const line of lines) {
    const [opponent, me] = line.split(" ");
    const myPickScore = getPickScore(me);
    const opponentPickScore = getPickScore(opponent);
    const outcome = getOutcome(myPickScore, opponentPickScore);
    const outcomeScore = getOutcomeScore(outcome);
    part1 += myPickScore + outcomeScore;

    const wantedOutcome = me === "X" ? 2 : me === "Y" ? 0 : 1;
    const pickScoreForWantedOutcome =
      ((wantedOutcome + opponentPickScore - 1) % 3) + 1;

    part2 += pickScoreForWantedOutcome + getOutcomeScore(wantedOutcome);
  }

  return {
    part1,
    part2,
  };
};
