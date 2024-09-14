import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  paletteActiveColorAtom,
  paletteColorsAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
} from "@/store/jotai";
import { colord } from "colord";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { HslColor } from "react-colorful";

type TInputIds = "rgb" | "hsl" | "hex";

export default function ColorInputs() {
  // accessing store data
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const sandboxActiveType = useAtomValue(sandboxActiveTypeAtom);
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);
  const paletteActiveColor = useAtomValue(paletteActiveColorAtom);

  // currently active input field tracker, to avoid rerenders during edit
  const [activeInput, setActiveInput] = useState<TInputIds | undefined>();
  // local to ColorsInput storage for colors
  const [colorValues, setColorValues] = useState({
    hex: colord(sandboxColors[sandboxActiveType]).toHex(),
    rgb: colord(sandboxColors[sandboxActiveType]).toRgbString(),
    hsl: colord(sandboxColors[sandboxActiveType]).toHslString(),
    hexError: false,
    rgbError: false,
    hslError: false,
  });

  useEffect(() => {
    setColorValues({
      hex:
        activeInput === "hex"
          ? colorValues.hex
          : colord(sandboxColors[sandboxActiveType]).toHex(),
      rgb:
        activeInput === "rgb"
          ? colorValues.rgb
          : colord(sandboxColors[sandboxActiveType]).toRgbString(),
      hsl:
        activeInput === "hsl"
          ? colorValues.hsl
          : colord(sandboxColors[sandboxActiveType]).toHslString(),
      hexError: false,
      rgbError: false,
      hslError: false,
    });
  }, [sandboxColors[sandboxActiveType]]);

  return (
    <div className="flex flex-col gap-2 pt-0 text-primary-foreground">
      <ColorInput
        error={colorValues.hexError}
        id="hex"
        label="Hex"
        value={colorValues.hex}
        setColor={(hslColor) => {
          // updatig store color for the shadcn/ui variable to be used in sandbox
          setSandboxColors({ ...sandboxColors, [sandboxActiveType]: hslColor });
          // updating palette active color
          setPaletteColors(
            paletteColors
              .slice(0, paletteActiveColor)
              .concat(hslColor, paletteColors.slice(paletteActiveColor + 1)),
          );
        }}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            hex: color,
            hexError: error,
          }))
        }
        setActiveInput={setActiveInput}
      />
      <ColorInput
        error={colorValues.rgbError}
        id="rgb"
        label="RGB"
        value={colorValues.rgb}
        setColor={(hslColor) => {
          // updatig store color for the shadcn/ui variable to be used in sandbox
          setSandboxColors({ ...sandboxColors, [sandboxActiveType]: hslColor });
          // updating palette active color
          setPaletteColors(
            paletteColors
              .slice(0, paletteActiveColor)
              .concat(hslColor, paletteColors.slice(paletteActiveColor + 1)),
          );
        }}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            rgb: color,
            rgbError: error,
          }))
        }
        setActiveInput={setActiveInput}
      />
      <ColorInput
        error={colorValues.hslError}
        id="hsl"
        label="HSL"
        value={colorValues.hsl}
        setColor={(hslColor) => {
          // updatig store color for the shadcn/ui variable to be used in sandbox
          setSandboxColors({ ...sandboxColors, [sandboxActiveType]: hslColor });
          // updating palette active color
          setPaletteColors(
            paletteColors
              .slice(0, paletteActiveColor)
              .concat(hslColor, paletteColors.slice(paletteActiveColor + 1)),
          );
        }}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            hsl: color,
            hslError: error,
          }))
        }
        setActiveInput={setActiveInput}
      />
    </div>
  );
}

const ColorInput = ({
  error,
  id,
  label,
  setColor,
  setColorValue,
  value,
  setActiveInput,
}: {
  label: string;
  id: TInputIds;
  value: string;
  error: boolean;
  setColor: (color: HslColor) => void;
  setColorValue: ({ color, error }: { color: string; error: boolean }) => void;
  setActiveInput: (newActiveInput: TInputIds | undefined) => void;
}) => {
  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className="absolute -top-2 left-3 rounded-sm bg-slate-200 px-1 text-neutral-800"
      >
        {label}
      </Label>
      <Input
        type="text"
        id={id}
        value={value}
        className="transition-colors duration-500"
        style={
          error
            ? {
                backgroundColor: "rgba(195, 50, 50, 0.5)",
                border: "1px solid rgba(195, 50, 50, 0.8)",
              }
            : undefined
        }
        onChange={(e) => {
          if (colord(e.currentTarget.value).isValid()) {
            setColorValue({
              color: e.target.value,
              error: false,
            });

            setColor(colord(e.currentTarget.value).toHsl());
          } else {
            setColorValue({
              error: true,
              color: e.target.value,
            });
          }
        }}
        onFocus={() => setActiveInput(id)}
        onBlur={() => setActiveInput(undefined)}
      />
    </div>
  );
};
