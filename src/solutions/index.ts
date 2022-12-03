import { Solver } from "../types";
import { day01 } from "./day01";
import { day02 } from "./day02";

export function getSolverForDay(day: number): Solver {
  switch (day) {
    case 1:
      return day01;
    case 2:
      return day02;
    default:
      throw new Error(`Day ${day} has not been implemented yet`);
  }
}
