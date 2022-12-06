import { Solver } from "../types";

function findMarker(input: string, count: number) {
  const c = count - 1;
  for (let i = c; i < input.length; i++) {
    const mostRecentlyReceived = input.slice(i - c, i + 1);
    const charSet = new Set(mostRecentlyReceived);
    if (charSet.size === count) {
      return i + 1;
    }
  }

  throw new Error("could not find a marker");
}

export const day06: Solver = (lines) => {
  const input = lines[0];

  return {
    part1: findMarker(input, 4),
    part2: findMarker(input, 14),
  };
};
