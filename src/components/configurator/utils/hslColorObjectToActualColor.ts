import { HslColor } from "react-colorful";

export default function hslColorObjectToActualColor({
  hslColor,
  exporting,
  opacity,
}: {
  hslColor: HslColor;
  opacity?: number;
  exporting?: Boolean;
}): string {
  return exporting
    ? `${hslColor.h} ${hslColor.s}% ${hslColor.l}%;`
    : `hsl(${hslColor.h} ${hslColor.s} ${hslColor.l}${
        opacity ? "/ " + opacity + "%" : ""
      })`;
}
