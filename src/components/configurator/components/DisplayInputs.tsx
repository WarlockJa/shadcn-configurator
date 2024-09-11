import { useState } from "react";
import { TColorsState } from "../settings";
import { Input } from "@/components/ui/input";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function DisplayInputs({ colors }: { colors: TColorsState }) {
  return (
    <>
      <DisplayInput colors={colors} />
      <DisplayInput colors={colors} disabled />
      <DisplayInput colors={colors} placeholder />
    </>
  );
}

const DisplayInput = ({
  colors,
  placeholder,
  disabled,
}: {
  colors: TColorsState;
  disabled?: Boolean;
  placeholder?: Boolean;
}) => {
  const [focus, setFocus] = useState<Boolean>(false);

  const style = defaultInputStyles({
    colors,
    focus,
    placeholder: Boolean(placeholder),
  });
  return (
    <>
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
    </>
  );
};

const defaultInputStyles = ({
  colors,
  focus,
  placeholder,
}: {
  colors: TColorsState;
  focus: Boolean;
  placeholder: Boolean;
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
