import { HslColor } from "react-colorful";
import { TColorsState, TComponentTypes, TCssVars } from "../settings";
import { hslValuesSeparator } from "../regex";

export default function generateColors({
  style,
  cssVars,
}: {
  style: CSSStyleDeclaration;
  cssVars: TCssVars;
}): TColorsState {
  // @ts-expect-error I fought TS and the TS won
  const result: TColorsState = {};
  Object.entries(cssVars).forEach(
    (cssVar) =>
      (result[cssVar[0] as TComponentTypes] = cssVarToHslObj(
        style.getPropertyValue(cssVar[1]),
      )),
  );
  return result;
}

const cssVarToHslObj = (cssVar: string): HslColor => {
  const hslParts = cssVar.split(hslValuesSeparator).filter(Boolean);
  return {
    h: Number(hslParts[0]),
    s: Number(hslParts[1]),
    l: Number(hslParts[2]),
  };
};
