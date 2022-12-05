import { Solver } from "../types";
import { cloneDeep } from "lodash";

type Stacks<T> = Array<Array<T>>;

interface Rearragnement {
  count: number;
  from: number;
  to: number;
}

function parseDrawing(input: Array<string>): [Stacks<string>, Array<string>] {
  const stacksCount = Math.ceil(input[0].length / 4);
  const stacks = new Array(stacksCount).fill(0).map(() => []) as Array<
    Array<string>
  >;
  let i = 0;
  for (; i < input.length; i++) {
    const line = input[i];
    if (/\d/.test(line[1])) break;
    for (let j = 0; j < stacksCount; j++) {
      const n = line[j * 4 + 1];
      if (n !== " ") {
        stacks[j].unshift(n);
      }
    }
  }

  return [stacks, input.slice(i + 2)];
}

function parseRearrangements(
  input: Array<string>
): ReadonlyArray<Rearragnement> {
  const rearrangements: Array<Rearragnement> = [];

  const re = /move (\d+) from (\d+) to (\d+)/;
  for (const line of input) {
    const match = line.match(re);
    if (!match) throw new Error(`'${line}' does not match expected input`);

    rearrangements.push({
      count: Number.parseInt(match[1]),
      from: Number.parseInt(match[2]) - 1,
      to: Number.parseInt(match[3]) - 1,
    });
  }

  return rearrangements;
}

export const day05: Solver = (lines) => {
  const input = [...lines];

  const [stacks1, remainingInput] = parseDrawing(input);
  const stacks2 = cloneDeep(stacks1);
  const rearrangements = parseRearrangements(remainingInput);

  for (const rearrangement of rearrangements) {
    // part 1
    for (let i = 0; i < rearrangement.count; i++) {
      stacks1[rearrangement.to].push(stacks1[rearrangement.from].pop()!);
    }

    // part 2
    const from = stacks2[rearrangement.from];
    const to = stacks2[rearrangement.to];
    to.push(...from.splice(from.length - rearrangement.count));
  }

  const part1 = stacks1.reduce((acc, stack) => acc + stack.at(-1), "");
  const part2 = stacks2.reduce((acc, stack) => acc + stack.at(-1), "");

  return { part1, part2 };
};
