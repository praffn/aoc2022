import { Solver } from "../types";

// Returns true if `candidateSubset` is a (non-proper) subset of `superset`
function isSubset<T>(
  superset: ReadonlySet<T>,
  candidateSubset: ReadonlySet<T>
): boolean {
  if (candidateSubset.size > superset.size) return false;
  for (const element of candidateSubset) {
    if (!superset.has(element)) return false;
  }
  return true;
}

function hasOverlap<T>(a: ReadonlySet<T>, b: ReadonlySet<T>) {
  for (const item of a) {
    if (b.has(item)) return true;
  }
  return false;
}

function rangeToSet(low: number, high: number) {
  const set = new Set<number>();
  for (let i = low; i <= high; i++) {
    set.add(i);
  }
  return set;
}

export const day04: Solver = (lines) => {
  let part1 = 0;
  let part2 = 0;

  for (const line of lines) {
    const [range1, range2] = line
      .split(",")
      .map((rawRange) => rawRange.split("-").map((n) => Number.parseInt(n, 10)))
      .map(([low, high]) => rangeToSet(low, high));

    part1 += isSubset(range1, range2) || isSubset(range2, range1) ? 1 : 0;
    part2 += hasOverlap(range1, range2) ? 1 : 0;
  }

  return {
    part1,
    part2,
  };
};
