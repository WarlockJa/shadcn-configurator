import { z } from "zod";
import { cssVars, IConfiguratorState, paletteSize } from "./settings";
import { colord } from "colord";
import { HslColor } from "react-colorful";

export const schemaIConfiguratorState = z.custom<IConfiguratorState>((val) => {
  const cssVarsKeys = Object.keys(cssVars);
  try {
    // checking type
    if (!cssVarsKeys.includes(val.type)) return false;

    // checking colors
    cssVarsKeys.forEach((item) => {
      if (!colord(val.colors[item]).isValid()) throw new Error();
    });

    // checking paletteActiveColor
    if (
      isNaN(val.paletteActiveColor) ||
      val.paletteActiveColor > paletteSize - 1 ||
      val.paletteActiveColor < 0
    )
      return false;

    // checking paletteColors
    val.paletteColors.forEach((item: HslColor) => {
      if (!colord(item).isValid()) throw new Error();
    });
  } catch (error) {
    return false;
  }

  return true;
});
