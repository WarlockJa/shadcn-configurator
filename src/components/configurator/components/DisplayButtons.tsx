import { useState } from "react";
import { TColorsState } from "../settings";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DisplayButtons({ colors }: { colors: TColorsState }) {
  const [forceHover, setForceHover] = useState(false);
  return (
    <div className="my-2 w-full rounded-lg border-4">
      <div className="relative">
        <h1
          style={{
            color: hslColorObjectToActualColor({
              hslColor: colors["cardForeground"],
            }),
            border: hslColorObjectToActualColor({ hslColor: colors["border"] }),
          }}
          className="text-center text-xl"
        >
          Buttons
        </h1>
        <div className="absolute right-1 top-1 flex h-fit items-center p-0">
          <Label htmlFor="forceHover" className="font-serif">
            force hover&nbsp;
          </Label>
          <Switch
            id="forceHover"
            checked={forceHover}
            onCheckedChange={() => setForceHover((prev) => !prev)}
          />
        </div>
      </div>
      <div className="my-2 flex flex-wrap justify-around">
        <DisplayButton
          forceHover={forceHover}
          colors={colors}
          variant="default"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={colors}
          variant="destructive"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={colors}
          variant="ghost"
        />
        <DisplayButton forceHover={forceHover} colors={colors} variant="link" />
        <DisplayButton
          forceHover={forceHover}
          colors={colors}
          variant="outline"
        />
        <DisplayButton
          forceHover={forceHover}
          colors={colors}
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
