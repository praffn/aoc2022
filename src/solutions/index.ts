import { Solver } from "../types";
import { day01 } from "./day01";
import { day02 } from "./day02";
import { day03 } from "./day03";
import { day04 } from "./day04";
import { day05 } from "./day05";
import { day06 } from "./day06";

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
    case 5:
      return day05;
    case 6:
      return day06;
    default:
      throw new Error(`Day ${day} has not been implemented yet`);
  }
}
