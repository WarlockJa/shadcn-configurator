import React from "react";
import { TColorsState } from "../../settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import DisplayButtons from "./DisplayButtons";
import DisplayInputs from "./DisplayInputs";
import { useAtomValue } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";

export default function DisplayCard() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);
  return (
    <Card style={defaultCardStyles({ colors: sandboxColors })}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription
          style={{
            color: hslColorObjectToActualColor({
              hslColor: sandboxColors["mutedForeground"],
            }),
          }}
        >
          Card description. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Dolorem dignissimos porro magni natus. Repellendus placeat
          voluptatibus natus enim omnis facere repudiandae expedita recusandae!
          Minus aperiam laudantium, iure aut earum sit?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DisplayButtons />
        <DisplayInputs />
      </CardContent>
    </Card>
  );
}

const defaultCardStyles = ({ colors }: { colors: TColorsState }) => {
  // bg-card text-card-foreground
  return {
    backgroundColor: hslColorObjectToActualColor({ hslColor: colors["card"] }),
    color: hslColorObjectToActualColor({ hslColor: colors["cardForeground"] }),
  };
};
