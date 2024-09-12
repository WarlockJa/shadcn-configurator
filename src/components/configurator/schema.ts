import { z } from "zod";
import { cssVars, IColorState } from "./settings";
import { colord } from "colord";

export const schemaIColorState = z.custom<IColorState>((val) => {
  const cssVarsKeys = Object.keys(cssVars);
  // checking type
  if (!cssVarsKeys.includes(val.type)) return false;

  // checking colors
  try {
    cssVarsKeys.forEach((item) => {
      if (!colord(val.colors[item]).isValid()) throw new Error();
    });

    return true;
  } catch (error) {
    return false;
  }
});
