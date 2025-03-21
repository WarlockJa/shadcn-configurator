import {
  paletteActiveColorAtom,
  paletteColorsAtom,
  resetColorAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
} from "@/store/jotai";
import { useAtom, useAtomValue } from "jotai";
import {
  useCallback,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

export default function useHotKeys() {
  const [paletteActiveColor, setPaletteActiveColor] = useAtom(
    paletteActiveColorAtom,
  );
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const resetColor = useAtomValue(resetColorAtom);
  const sandboxActiveType = useAtomValue(sandboxActiveTypeAtom);
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);

  //   // creating Effect Events that would rely on actual state
  //   const onCtrlCPress = useEffectEvent(() =>
  //     setSandboxColors({
  //       ...sandboxColors,
  //       [sandboxActiveType]: paletteColors[paletteActiveColor],
  //     }),
  //   );

  //   const onCtrlVPress = useCallback(() => {
  //     setPaletteColors(
  //       paletteColors.map((color, idx) =>
  //         idx === paletteActiveColor ? sandboxColors[sandboxActiveType] : color,
  //       ),
  //     );
  //   }, [
  //     setPaletteColors,
  //     paletteColors,
  //     paletteActiveColor,
  //     sandboxActiveType,
  //     sandboxColors,
  //   ]);

  useEffect(() => {
    window.addEventListener("keydown", onHotkeyPress);

    function onHotkeyPress(e: KeyboardEvent) {
      //   console.log(e.key);

      if (!e.ctrlKey) return;

      switch (e.key) {
        // palette hotkeys
        case "1":
          setPaletteActiveColor(0);
          break;
        case "2":
          setPaletteActiveColor(1);
          break;
        case "3":
          setPaletteActiveColor(2);
          break;
        case "4":
          setPaletteActiveColor(3);
          break;
        case "5":
          setPaletteActiveColor(4);
          break;

        // copying color from the palette
        case "c":
        case "C":
          setSandboxColors({
            ...sandboxColors,
            [sandboxActiveType]: paletteColors[paletteActiveColor],
          });
          break;

        // resetting color to the initial value(if exists) from first select
        case "x":
        case "X":
          resetColor &&
            setSandboxColors({
              ...sandboxColors,
              [sandboxActiveType]: resetColor,
            });
          break;

        // updating palette active color
        case "v":
        case "V":
          console.log(paletteColors);
          setPaletteColors(
            paletteColors.map((color, idx) =>
              idx === paletteActiveColor
                ? sandboxColors[sandboxActiveType]
                : color,
            ),
          );
          break;
      }
    }

    return () => {
      window.removeEventListener("keydown", onHotkeyPress);
    };
  }, []);
}
