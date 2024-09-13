"use client";

import { TColorsState, TComponentTypes, TCssVars } from "../settings";
import generateColors from "./generateColors";

export default function configuratorInit({ cssVars }: { cssVars: TCssVars }): {
  type: TComponentTypes;
  colors: TColorsState;
} {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const colors = generateColors({ style, cssVars });

  return {
    type: "background",
    colors,
  };
}
