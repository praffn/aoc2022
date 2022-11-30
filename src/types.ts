export interface Solution {
  part1: number;
  part2: number;
}

export type Solver = (lines: ReadonlyArray<string>) => Solution;
