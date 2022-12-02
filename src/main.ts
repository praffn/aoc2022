import { parseArgs as nodeParseArgs, ParseArgsConfig } from "node:util";
import { createReadStream } from "node:fs";
import { once } from "node:events";
import { createInterface } from "readline/promises";
import { stdin, hrtime } from "node:process";

import { getSolverForDay } from "./solutions";

function printHelp() {
  console.log(`
Usage: aoc2022 [flags] [day]

day: which day you wish to solve for (default: 1)

Flags:
    --input, -i       The input file, - for stdin (default: -)
`);
}

const argConfig: ParseArgsConfig = {
  options: {
    input: {
      type: "string",
      short: "i",
    },
  },
  allowPositionals: true,
};

function parseArgs(): { day: number; input: string } {
  try {
    const args = nodeParseArgs(argConfig);
    const rawDay = args.positionals[0] ?? "1";
    const day = Number.parseInt(rawDay);
    if (Number.isNaN(day)) {
      throw new Error(`Invalid day '${rawDay}'`);
    }
    const input = args.values.input?.toString() ?? "-";
    return { day, input };
  } catch (e) {
    console.log((e as any).message);
    printHelp();
    process.exit(1);
  }
}

function getStream(input: string): NodeJS.ReadableStream {
  if (input === "-") return stdin;
  return createReadStream(input);
}

function getReadline(stream: NodeJS.ReadableStream) {
  return createInterface({
    input: stream,
    terminal: false,
    crlfDelay: Infinity,
  });
}

async function readAllLinesToArray(input: string) {
  const stream = getStream(input);
  const rl = getReadline(stream);

  const arr: Array<string> = [];

  rl.on("line", (line) => arr.push(line));

  await once(rl, "close");

  return arr;
}

async function main() {
  const { day, input } = parseArgs();
  const solver = getSolverForDay(day);
  const lines = await readAllLinesToArray(input);

  const startTimeNs = hrtime.bigint();
  const solution = solver(lines);
  const endTimeNs = hrtime.bigint();
  const runningTimeNs = endTimeNs - startTimeNs;

  console.log(`✨ Day ${day} solved! ✨\n`);
  console.log(`  Part 1: ${solution.part1}`);
  console.log(`  Part 2: ${solution.part2}`);
  console.log();
  console.log(`Finished in ${runningTimeNs} ns`);
}

main();
