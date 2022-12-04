import { intersection } from "lodash";
import { Solver } from "../types";

function getCompartments<T>(
  items: ReadonlyArray<T>
): [ReadonlySet<T>, ReadonlySet<T>] {
  const halfLength = Math.floor(items.length / 2);
  return [
    new Set(items.slice(0, halfLength)),
    new Set(items.slice(halfLength)),
  ];
}

function getItemsInBothCompartments<T>(
  items: ReadonlyArray<T>
): ReadonlyArray<T> {
  const [left, right] = getCompartments(items);
  const inBoth = [];
  for (const item of left) {
    if (right.has(item)) {
      inBoth.push(item);
    }
  }
  return inBoth;
}

function getPriorityScoreForItem(item: string) {
  if ("a" <= item || item >= "z") return item.charCodeAt(0) - 96;
  return item.charCodeAt(0) - 38;
}

function* chunks<T>(array: ReadonlyArray<T>, size: number) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

export const day03: Solver = (lines) => {
  let part1 = 0;
  let part2 = 0;

  // Split all lines into groups of 3
  for (const group of chunks(lines, 3)) {
    const lineItems = group.map((line) => line.split(""));
    const groupCommonItems = intersection(...lineItems);
    part2 += groupCommonItems.reduce(
      (acc, item) => acc + getPriorityScoreForItem(item),
      0
    );
    for (const items of lineItems) {
      const itemsInBothCompartments = getItemsInBothCompartments(items);
      part1 += itemsInBothCompartments.reduce(
        (acc, item) => acc + getPriorityScoreForItem(item),
        0
      );
    }
  }

  return {
    part1,
    part2,
  };
};
