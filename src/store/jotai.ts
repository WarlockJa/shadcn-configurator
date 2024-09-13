import {
  defaultSandboxActiveType,
  defaultSandboxColors,
  paletteSize,
  TColorsState,
  TComponentTypes,
} from "@/components/configurator/settings";
import { atom } from "jotai";
import { HslColor } from "react-colorful";

// sandbox values
export const sandboxColorsAtom = atom<TColorsState>(defaultSandboxColors);
export const sandboxActiveTypeAtom = atom<TComponentTypes>(
  defaultSandboxActiveType,
);
// palette values
export const paletteColorsAtom = atom<HslColor[]>(
  Array(paletteSize).fill({ h: 0, s: 0, l: 100 }),
);
export const paletteActiveColorAtom = atom<number>(0);
