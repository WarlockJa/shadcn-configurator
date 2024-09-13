import { paletteActiveColorAtom, paletteColorsAtom } from "@/store/jotai";
import { colord } from "colord";
import { useAtom, useAtomValue } from "jotai";

export default function Palette() {
  // accessing store data
  const paletteColors = useAtomValue(paletteColorsAtom);
  const [paletteActiveColor, setPaletteActiveColor] = useAtom(
    paletteActiveColorAtom,
  );

  return (
    <ul className="flex gap-2">
      {paletteColors.map((color, index) => (
        <li
          key={index}
          className="h-8 w-8 cursor-pointer rounded outline-offset-2"
          style={{
            backgroundColor: colord(color).toHex(),
            outline:
              index === paletteActiveColor ? "2px solid #e1e7ef" : "none",
          }}
          onClick={() => setPaletteActiveColor(index)}
        ></li>
      ))}
    </ul>
  );
}
