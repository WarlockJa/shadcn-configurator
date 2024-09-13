import { useState } from "react";
import { TColorsState } from "../../settings";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import { Button } from "@/components/ui/button";
import ForceSwitch from "./ForceSwitch";
import { useAtomValue } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";

export default function DisplayButtons() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);
  // local state switch to force Buttons display onHover css
  const [forceHover, setForceHover] = useState(false);
  return (
    <div className="my-2 w-full rounded-lg border-4">
      <div className="relative">
        <h1
          style={{
            color: hslColorObjectToActualColor({
              hslColor: sandboxColors["cardForeground"],
            }),
            border: hslColorObjectToActualColor({
              hslColor: sandboxColors["border"],
            }),
          }}
          className="px-2 text-xl md:text-center"
        >
          Buttons
        </h1>
        <ForceSwitch
          label="force hover"
          forceState={forceHover}
          setForceState={(e: boolean) => setForceHover(e)}
          style={{ top: "0px", right: "0px" }}
        />
      </div>
      <div className="my-2 flex flex-wrap justify-around">
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="default"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="destructive"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="ghost"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="link"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="outline"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={sandboxColors}
          variant="secondary"
        />
      </div>
    </div>
  );
}

const DisplayButton = ({
  variant,
  colors,
  forceHover,
}: {
  variant: TDefaultButtonVariants;
  colors: TColorsState;
  forceHover: boolean;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const style = defaultButtonStyles({
    colors,
    hover: forceHover ? forceHover : hover,
    variant,
  });

  return (
    <Button
      variant={variant}
      style={style}
      onMouseLeave={() => setHover(false)}
      onMouseOver={() => setHover(true)}
    >
      {variant}
    </Button>
  );
};

const defaultButtonStyles = ({
  colors,
  variant,
  hover,
}: {
  colors: TColorsState;
  hover: boolean;
  variant: TDefaultButtonVariants;
}) => {
  switch (variant) {
    // default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    case "default":
      return hover
        ? {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["primary"],
              opacity: 90,
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["primaryForeground"],
            }),
          }
        : {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["primary"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["primaryForeground"],
            }),
          };
    // destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    case "destructive":
      return hover
        ? {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["destructive"],
              opacity: 90,
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["destructiveForeground"],
            }),
          }
        : {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["destructive"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["destructiveForeground"],
            }),
          };
    // outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    case "outline":
      return hover
        ? {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["accent"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["accentForeground"],
            }),
            border: `1px solid ${hslColorObjectToActualColor({
              hslColor: colors["input"],
            })}`,
          }
        : {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["background"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["destructiveForeground"],
            }),
            border: `1px solid ${hslColorObjectToActualColor({
              hslColor: colors["input"],
            })}`,
          };
    // secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    case "secondary":
      return hover
        ? {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["secondary"],
              opacity: 80,
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["secondaryForeground"],
            }),
          }
        : {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["secondary"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["secondaryForeground"],
            }),
          };
    // ghost: "hover:bg-accent hover:text-accent-foreground",
    case "ghost":
      return hover
        ? {
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colors["accent"],
            }),
            color: hslColorObjectToActualColor({
              hslColor: colors["accentForeground"],
            }),
          }
        : {};
    // link: "text-primary underline-offset-4 hover:underline",
    case "link":
      return hover
        ? {
            color: hslColorObjectToActualColor({ hslColor: colors["primary"] }),
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }
        : {
            color: hslColorObjectToActualColor({ hslColor: colors["primary"] }),
          };
  }
};
