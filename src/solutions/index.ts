import { Solver } from "../types";
import { day01 } from "./day01";
import { day02 } from "./day02";
import { day03 } from "./day03";
import { day04 } from "./day04";

export function getSolverForDay(day: number): Solver {
  switch (day) {
    case 1:
      return day01;
    case 2:
      return day02;
    case 3:
      return day03;
    case 4:
      return day04;
    default:
      throw new Error(`Day ${day} has not been implemented yet`);
  }
}
