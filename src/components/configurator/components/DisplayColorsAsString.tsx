import { TColorsState, TComponentTypes, TCssVars } from "../settings";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function DisplayColorsAsString({
  colors,
  cssVars,
}: {
  colors: TColorsState;
  cssVars: TCssVars;
}) {
  return (
    <ul>
      {Object.entries(colors).map((color) => (
        <li
          key={color[0]}
          className="drop-shadow-[2px_2px_1.5px_rgba(13,24,17,0.8)]"
        >
          {cssVars[color[0] as TComponentTypes]}:{" "}
          {hslColorObjectToActualColor({ hslColor: color[1], exporting: true })}
        </li>
      ))}
    </ul>
  );
}
