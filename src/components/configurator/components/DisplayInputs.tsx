import { useState } from "react";
import { TColorsState } from "../settings";
import { Input } from "@/components/ui/input";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import ForceSwitch from "./ForceSwitch";

export default function DisplayInputs({ colors }: { colors: TColorsState }) {
  const [forceFocus, setForceFocus] = useState(false);
  return (
    <div className="rounded-lg border-4 p-2">
      <div className="relative">
        <h1 className="px-2 text-xl md:text-center">Inputs</h1>
        <ForceSwitch
          label="force focus"
          forceState={forceFocus}
          setForceState={setForceFocus}
          style={{ top: "-8px", right: "-8px" }}
        />
      </div>
      <div className="my-2 flex flex-col gap-2">
        <DisplayInput forceFocus={forceFocus} colors={colors} />
        <DisplayInput forceFocus={forceFocus} colors={colors} disabled />
        <DisplayInput forceFocus={forceFocus} colors={colors} placeholder />
      </div>
    </div>
  );
}

const DisplayInput = ({
  colors,
  placeholder,
  disabled,
  forceFocus,
}: {
  colors: TColorsState;
  disabled?: boolean;
  placeholder?: boolean;
  forceFocus: boolean;
}) => {
  const [focus, setFocus] = useState<boolean>(false);

  const style = defaultInputStyles({
    colors,
    focus: forceFocus ? forceFocus : focus,
    placeholder: Boolean(placeholder),
    disabled: Boolean(disabled),
  });
  return (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={style}
      disabled={Boolean(disabled)}
      className="shadow-sm focus-visible:outline-none focus-visible:ring-0"
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
  disabled,
}: {
  colors: TColorsState;
  focus: boolean;
  placeholder: boolean;
  disabled: boolean;
}) => {
  // border-input bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
  const style: React.CSSProperties = {
    border: `1px solid ${hslColorObjectToActualColor({
      hslColor: colors["input"],
    })}`,
    backgroundColor: "transparent",
  };

  if (placeholder) {
    style["color"] = hslColorObjectToActualColor({
      hslColor: colors["mutedForeground"],
    });
  }

  if (disabled) {
    return style;
  }

  if (focus) {
    style["outline"] = "2px solid transparent";
    style["outlineOffset"] = "2px";
    style["border"] = `1px solid ${hslColorObjectToActualColor({
      hslColor: colors["ring"],
    })}`;
    style["boxShadow"] = `0 0 0 1px  ${hslColorObjectToActualColor({
      hslColor: colors["ring"],
    })}`;
  }

  return style;
};
