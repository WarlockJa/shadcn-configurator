import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  cssVars,
  TColorsState,
  TComponentTypes,
  TCssVars,
} from "../../settings";
import { importMatchSelector } from "../../regex";
import { colord } from "colord";
import { useAtom } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";

export default function ImportVars() {
  // accessing store data
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);

  // local storage for user input
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="rounded-b-none placeholder:text-slate-300"
        rows={10}
        maxLength={1000}
        placeholder={`Paste shadcn variables. \nExample: \n--background: 0 0% 100%;\n--accent: 0 0% 96.1%;\n--ring: 0 0% 3.9%;`}
      />
      <Button
        onClick={() =>
          setSandboxColors(
            parseStringToTColorState({
              colors: sandboxColors,
              text,
              lookupTable: cssVars,
            }),
          )
        }
        className="rounded-t-none"
        variant={"secondary"}
      >
        Import
      </Button>
    </div>
  );
}

const parseStringToTColorState = ({
  text,
  lookupTable,
  colors,
}: {
  text: string;
  lookupTable: TCssVars;
  colors: TColorsState;
}) => {
  const result = structuredClone(colors);

  Object.entries(lookupTable).map((item) => {
    const foundHslColor = importMatchSelector(item[1]).exec(text);
    if (foundHslColor && colord(`hsl(${foundHslColor[1]})`).isValid()) {
      result[item[0] as TComponentTypes] = colord(
        `hsl(${foundHslColor[1]})`,
      ).toHsl();
    }
  });

  return result;
};
