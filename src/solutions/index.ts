import { Solver } from "../types";
import { day01 } from "./day01";

export { day01 } from "./day01";

export function getSolverForDay(day: number): Solver {
  switch (day) {
    case 1:
      return day01;
    default:
      throw new Error(`Day ${day} has not been implemented yet`);
  }
}
