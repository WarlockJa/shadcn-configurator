import {
  paletteActiveColorAtom,
  paletteColorsAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
} from "@/store/jotai";
import { useAtom, useAtomValue } from "jotai";
import { HslColor, HslColorPicker } from "react-colorful";
import useDebounce from "../../hooks/useDebounce";

export default function HslColorPickerPrmitive() {
  // accessing store data
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const sandboxActiveType = useAtomValue(sandboxActiveTypeAtom);
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);
  const paletteActiveColor = useAtomValue(paletteActiveColorAtom);

  // debouncing color selection for the HslColorPicker to avoid too frequent state updates
  const debouncedColorValue = useDebounce(sandboxColors, 500);

  const handleColorChange = (hslColor: HslColor) => {
    // updatig store color for the shadcn/ui variable to be used in sandbox
    setSandboxColors({
      ...sandboxColors,
      [sandboxActiveType]: hslColor,
    });
    // updating palette active color
    setPaletteColors(
      paletteColors
        .slice(0, paletteActiveColor)
        .concat(hslColor, paletteColors.slice(paletteActiveColor + 1)),
    );
  };

  return (
    <HslColorPicker
      color={debouncedColorValue[sandboxActiveType]}
      style={{ width: "300px", height: "300px", marginBottom: "1em" }}
      className="z-30"
      onChange={handleColorChange}
    />
  );
}
