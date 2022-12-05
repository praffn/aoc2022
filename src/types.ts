export interface Solution {
  part1: number | string;
  part2: number | string;
}

export type Solver = (lines: ReadonlyArray<string>) => Solution;
