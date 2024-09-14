// This here be the list of your shadcn/ui variables.
// This list can be extended with more custom variables
// as long as they exist inside global.css
// Extending process:
// Step 1: add new variable to global.css
// Step 2: add camelCase code and give it actual css variable name value

import { HslColor } from "react-colorful";
import { Transform } from "@dnd-kit/utilities";

export const cssVars = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  secondary: "--secondary",
  secondaryForeground: "--secondary-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
} as const;

export const paletteSize = 5;

export type TCssVars = typeof cssVars;
export type TComponentTypes = keyof typeof cssVars;
export type TColorsState = { [key in TComponentTypes]: HslColor };
export interface IConfiguratorState {
  type: TComponentTypes;
  colors: TColorsState;
  paletteColors: HslColor[];
  paletteActiveColor: number;
  draggableElementsData: TDraggableElementPosition;
}

// default values for the jotai store
export const defaultSandboxColors: TColorsState = {
  background: { h: 0, s: 0, l: 100 },
  foreground: { h: 0, s: 0, l: 3.9 },
  card: { h: 0, s: 0, l: 100 },
  cardForeground: { h: 0, s: 0, l: 3.9 },
  popover: { h: 0, s: 0, l: 100 },
  popoverForeground: { h: 0, s: 0, l: 3.9 },
  primary: { h: 0, s: 0, l: 9 },
  primaryForeground: { h: 0, s: 0, l: 98 },
  secondary: { h: 0, s: 0, l: 96.1 },
  secondaryForeground: { h: 0, s: 0, l: 9 },
  muted: { h: 0, s: 0, l: 96.1 },
  mutedForeground: { h: 0, s: 0, l: 45.1 },
  accent: { h: 0, s: 0, l: 96.1 },
  accentForeground: { h: 0, s: 0, l: 9 },
  destructive: { h: 0, s: 84.2, l: 60.2 },
  destructiveForeground: { h: 0, s: 0, l: 98 },
  border: { h: 0, s: 0, l: 89.8 },
  input: { h: 0, s: 0, l: 89.8 },
  ring: { h: 0, s: 0, l: 3.9 },
};
export const defaultSandboxActiveType: TComponentTypes = "background";

// default draggable elements values
export type TDraggableElements =
  | "sandbox"
  | "shadcn/ui variables"
  | "colors"
  | "import/export"
  | "palette";

export type TDraggableElementPosition = Record<TDraggableElements, Transform>;
export const defaultDraggableElementsData: TDraggableElementPosition = {
  sandbox: { x: 140, y: 60, scaleX: 0, scaleY: 0 },
  "shadcn/ui variables": { x: 2, y: 10, scaleX: 0, scaleY: 0 },
  colors: { x: 700, y: 10, scaleX: 0, scaleY: 0 },
  "import/export": { x: 300, y: 10, scaleX: 0, scaleY: 0 },
  palette: { x: 160, y: 10, scaleX: 0, scaleY: 0 },
};
