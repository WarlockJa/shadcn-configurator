// --background: 0 0% 100%;
// --foreground: 0 0% 3%;
// --card: 0 0% 100%;
// --card-foreground: 0 0% 3%;
// --popover: 0 0% 100%;
// --popover-foreground: 0 0% 3%;
// --primary: 0 0% 9%;
// --primary-foreground: 0 0% 98%;
// --secondary: 0 0% 96%;
// --secondary-foreground: 0 0% 9%;
// --accent: 0 0% 96%;
// --accent-foreground: 0 0% 9%;
// --destructive: 0 84% 2%;
// --destructive-foreground: 0 0% 98%;
// --ring: 0 66% 90%;
// --input: 0 0% 89%;
// --muted: 0 0% 96%;
// --muted-foreground: 0 0% 45%;
// --border: 0 0% 89%;

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cssVars, TColorsState, TComponentTypes, TCssVars } from "../settings";
import { importMatchSelector } from "../regex";
import { colord } from "colord";

export default function ImportVars({
  colors,
  setColors,
}: {
  setColors: (newColors: TColorsState) => void;
  colors: TColorsState;
}) {
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
          setColors(
            parseStringToTColorState({ colors, text, lookupTable: cssVars }),
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
    console.log(foundHslColor);
    if (foundHslColor) {
      result[item[0] as TComponentTypes] = colord(foundHslColor[1]).toHsl();
    }
  });

  console.log(result);

  return result;
};
