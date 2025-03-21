import {
  paletteActiveColorAtom,
  paletteColorsAtom,
  resetColorAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
} from "@/store/jotai";
import { useAtom, useAtomValue } from "jotai";
import { useHotkeys } from "react-hotkeys-hook";

export default function useHotKeys() {
  const [paletteActiveColor, setPaletteActiveColor] = useAtom(
    paletteActiveColorAtom,
  );
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const resetColor = useAtomValue(resetColorAtom);
  const sandboxActiveType = useAtomValue(sandboxActiveTypeAtom);
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);

  useHotkeys("ctrl + 1", () => setPaletteActiveColor(0));
  useHotkeys("ctrl + 2", () => setPaletteActiveColor(1));
  useHotkeys("ctrl + 3", () => setPaletteActiveColor(2));
  useHotkeys("ctrl + 4", () => setPaletteActiveColor(3));
  useHotkeys("ctrl + 5", () => setPaletteActiveColor(4));

  useHotkeys("ctrl + c", () =>
    setSandboxColors({
      ...sandboxColors,
      [sandboxActiveType]: paletteColors[paletteActiveColor],
    }),
  );
  useHotkeys(
    "ctrl + x",
    () =>
      resetColor &&
      setSandboxColors({
        ...sandboxColors,
        [sandboxActiveType]: resetColor,
      }),
  );
  useHotkeys("ctrl + v", () =>
    setPaletteColors(
      paletteColors.map((color, idx) =>
        idx === paletteActiveColor ? sandboxColors[sandboxActiveType] : color,
      ),
    ),
  );
}
