import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { colord } from "colord";
import { useEffect, useState } from "react";
import { HslColor } from "react-colorful";

export default function ColorInputs({
  color,
  setColor,
}: {
  color: HslColor;
  setColor: (hslColor: HslColor) => void;
}) {
  const [colorValues, setColorValues] = useState({
    hex: colord(color).toHex(),
    rgb: colord(color).toRgbString(),
    hsl: colord(color).toHslString(),
    hexError: false,
    rgbError: false,
    hslError: false,
  });

  useEffect(() => {
    setColorValues({
      hex: colord(color).toHex(),
      rgb: colord(color).toRgbString(),
      hsl: colord(color).toHslString(),
      hexError: false,
      rgbError: false,
      hslError: false,
    });
  }, [color]);

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 p-4 pt-0 text-primary-foreground">
      <ColorInput
        error={colorValues.hexError}
        id="hex"
        label="Hex"
        value={colorValues.hex}
        setColor={setColor}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            hex: color,
            hexError: error,
          }))
        }
      />
      <ColorInput
        error={colorValues.rgbError}
        id="rgb"
        label="RGB"
        value={colorValues.rgb}
        setColor={setColor}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            rgb: color,
            rgbError: error,
          }))
        }
      />
      <ColorInput
        error={colorValues.hslError}
        id="hsl"
        label="HSL"
        value={colorValues.hsl}
        setColor={setColor}
        setColorValue={({ color, error }) =>
          setColorValues((prev) => ({
            ...prev,
            hsl: color,
            hslError: error,
          }))
        }
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
}: {
  label: string;
  id: string;
  value: string;
  error: boolean;
  setColor: (color: HslColor) => void;
  setColorValue: ({ color, error }: { color: string; error: boolean }) => void;
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
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
        onChange={(e) =>
          colord(e.currentTarget.value).isValid()
            ? setColorValue({
                color: e.target.value,
                error: false,
              })
            : setColorValue({
                error: true,
                color: e.target.value,
              })
        }
        onKeyDown={(e) => {
          if (e.code === "Enter" && !error) {
            setColor(colord(e.currentTarget.value).toHsl());
          }
        }}
      />
    </div>
  );
};
