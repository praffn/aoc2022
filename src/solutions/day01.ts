import { Solver } from "../types";

interface Elf {
  calories: ReadonlyArray<number>;
  total: number;
}

export const day01: Solver = (lines) => {
  const elves: Array<Elf> = [];
  let currentCalories: Array<number> = [];

  for (const line of lines) {
    if (line === "") {
      elves.push({
        calories: currentCalories,
        total: currentCalories.reduce((sum, n) => sum + n),
      });
      currentCalories = [];
      continue;
    }

    currentCalories.push(Number.parseInt(line));
  }

  elves.push({
    calories: currentCalories,
    total: currentCalories.reduce((sum, n) => sum + n),
  });

  elves.sort((a, b) => b.total - a.total);

  const part1 = elves[0].total;
  const part2 = elves[0].total + elves[1].total + elves[2].total;

  return {
    part1,
    part2,
  };
};
