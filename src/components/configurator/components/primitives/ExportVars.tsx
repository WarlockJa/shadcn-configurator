import { useAtomValue } from "jotai";
import { cssVars, TComponentTypes } from "../../settings";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import { sandboxColorsAtom } from "@/store/jotai";

export default function ExportVars() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);

  return (
    <ul>
      {Object.entries(sandboxColors).map((color) => (
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
