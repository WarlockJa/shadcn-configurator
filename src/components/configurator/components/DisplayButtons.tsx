import { useState } from "react";
import { TColorsState } from "../settings";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import { Button } from "@/components/ui/button";

export default function DisplayButtons({ colors }: { colors: TColorsState }) {
  return (
    <>
      <DisplayButton colors={colors} variant="default" />
      <DisplayButton colors={colors} variant="destructive" />
      <DisplayButton colors={colors} variant="ghost" />
      <DisplayButton colors={colors} variant="link" />
      <DisplayButton colors={colors} variant="outline" />
      <DisplayButton colors={colors} variant="secondary" />
    </>
  );
}

const DisplayButton = ({
  variant,
  colors,
}: {
  variant: TDefaultButtonVariants;
  colors: TColorsState;
}) => {
  const [hover, setHover] = useState<Boolean>(false);

  const style = defaultButtonStyles({ colors, hover, variant });

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
  hover: Boolean;
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
          }
        : {
            color: hslColorObjectToActualColor({ hslColor: colors["primary"] }),
          };
  }
};
