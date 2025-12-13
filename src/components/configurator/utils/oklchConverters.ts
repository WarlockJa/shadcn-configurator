import { colord, HslColor } from "colord";
import { converter, parseOklch } from "culori";

const hslToOklch = converter("oklch");
const oklchToHsl = converter("hsl");

export function convertHslToOklch({
  h,
  l,
  s,
}: {
  h: number;
  s: number;
  l: number;
}) {
  const oklchColor = hslToOklch({
    mode: "hsl",
    h: h ?? "0",
    l: l / 100,
    s: s / 100,
  });

  // formattin to CSS string.
  return `oklch(${roundUp(oklchColor.l, 3)} ${roundUp(oklchColor.c, 3)} ${roundUp(oklchColor.h ?? 0, 3)})`;
}

function roundUp(n: number, digits: number): number {
  return Math.round(n * 10 ** digits) / 10 ** digits;
}

export function convertOklchToHsl({
  h,
  l,
  c,
}: {
  h: number;
  l: number;
  c: number;
}): HslColor {
  const hslColor = oklchToHsl({
    mode: "oklch",
    h: h,
    l: l,
    c: c,
  });

  // return colord({ ...hslColor, h: hslColor.h ?? 0 }).toHsl();
  return {
    h: 0,
    l: Math.round(hslColor.l * 100),
    s: Math.round(hslColor.s * 100),
  };
}

export function parseOklchStringToHsl(oklchString: string): HslColor | null {
  const regex =
    /oklch\(\s*([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\s*\)/;

  const match = oklchString.match(regex);

  // If match is null, the string format is incorrect
  if (!match) {
    return null;
  }

  // The captured groups are at index 1, 2, and 3
  // We use the unary plus operator (+) to convert them from strings to numbers
  const l = +match[1];
  const c = +match[2];
  const h = +match[3];

  console.log(l, c, h);

  // checking for range data validity
  if (c < 0 || c > 0.4) return null;
  if (l < 0 || l > 1) return null;

  return convertOklchToHsl({ c, h, l });
}
