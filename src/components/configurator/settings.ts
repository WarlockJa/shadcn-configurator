// This here be the list of your shadcn/ui variables.
// This list can be extended with more custom variables
// as long as they exist inside global.css
// Extending process:
// Step 1: add new variable to global.css
// Step 2: add camelCase code and give it actual css variable name value
// Considerations: If default elements with default settings do not use your
// custom variables (whcih they don't) you won't see any effect in this component

import { HslColor } from "react-colorful";

// unless you modify it yourself. Good luck.
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
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  destructive: "--destructive",
  destructiveForeground: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
} as const;

export type TCssVars = typeof cssVars;
export type TComponentTypes = keyof typeof cssVars;
export type TColorsState = { [key in TComponentTypes]: HslColor };
