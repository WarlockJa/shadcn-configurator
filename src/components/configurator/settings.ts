// This here be the list of your shadcn/ui variables.
// This list can be extended with more custom variables
// as long as they exist inside global.css
// Extending process:
// Step 1: add new variable to global.css
// Step 2: add camelCase code and give it actual css variable name value

import { HslColor } from "react-colorful";

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
  accent: "--accent",
  accentForeground: "--accent-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  ring: "--ring",
  input: "--input",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  border: "--border",
} as const;

export type TCssVars = typeof cssVars;
export type TComponentTypes = keyof typeof cssVars;
export type TColorsState = { [key in TComponentTypes]: HslColor };
export interface IColorState {
  type: TComponentTypes;
  colors: TColorsState;
}
