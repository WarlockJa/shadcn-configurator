import { useState } from "react";
import { TColorsState } from "../settings";
import { Input } from "@/components/ui/input";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function DisplayInputs({ colors }: { colors: TColorsState }) {
  return (
    <div className="rounded-lg border-4 p-2">
      <h1 className="text-center text-xl">Inputs</h1>
      <div className="my-2 flex flex-col gap-2">
        <DisplayInput colors={colors} />
        <DisplayInput colors={colors} disabled />
        <DisplayInput colors={colors} placeholder />
      </div>
    </div>
  );
}

const DisplayInput = ({
  colors,
  placeholder,
  disabled,
}: {
  colors: TColorsState;
  disabled?: boolean;
  placeholder?: boolean;
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  const style = defaultInputStyles({
    colors,
    focus,
    placeholder: Boolean(placeholder),
  });
  return (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={style}
      disabled={Boolean(disabled)}
      defaultValue={
        Boolean(placeholder)
          ? "Placeholder text"
          : Boolean(disabled)
            ? "Disabled input"
            : "Input value"
      }
    />
  );
};

const defaultInputStyles = ({
  colors,
  focus,
  placeholder,
}: {
  colors: TColorsState;
  focus: boolean;
  placeholder: boolean;
}) => {
  return placeholder
    ? {
        border: `1px solid ${hslColorObjectToActualColor({
          hslColor: colors["input"],
        })}`,
        color: hslColorObjectToActualColor({
          hslColor: colors["mutedForeground"],
        }),
        backgroundColor: "transparent",
        opacity: 1,
      }
    : focus
      ? {
          border: `1px solid ${hslColorObjectToActualColor({
            hslColor: colors["input"],
          })}`,
          backgroundColor: "transparent",
          outline: "2px solid transparent",
          outlineOffset: "2px",
          "--tw-ring-color": hslColorObjectToActualColor({
            hslColor: colors["ring"],
          }),
        }
      : {
          border: `1px solid ${hslColorObjectToActualColor({
            hslColor: colors["input"],
          })}`,
          backgroundColor: "transparent",
        };
};
