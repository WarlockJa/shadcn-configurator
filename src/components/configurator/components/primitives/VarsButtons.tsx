"use client";

import { cssVars, TComponentTypes } from "../../settings";
import { Button } from "@/components/ui/button";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import { useAtom, useAtomValue } from "jotai";
import {
  paletteActiveColorAtom,
  paletteColorsAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
} from "@/store/jotai";
import { ClipboardCopy, ClipboardPaste, ClipboardX } from "lucide-react";
import { useState } from "react";
import { HslColor } from "react-colorful";

export default function VarsButtons() {
  // accessing store data
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const [sandboxActiveType, setSandboxActiveType] = useAtom(
    sandboxActiveTypeAtom,
  );
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);
  const paletteActiveColor = useAtomValue(paletteActiveColorAtom);
  // reset value
  const [resetColor, setResetColor] = useState<HslColor>();

  return (
    <>
      {Object.entries(sandboxColors).map((item) => (
        <Button
          key={item[0]}
          className="relative mb-1 rounded-none"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: item[1],
            }),
          }}
          onClick={() => {
            // updating sandbox active type
            setSandboxActiveType(item[0] as TComponentTypes);
            // saving new sandbox active type color value for possible reset
            setResetColor(sandboxColors[item[0] as TComponentTypes]);
          }}
        >
          <>
            {/* selection indicator */}
            <div
              className="absolute bottom-0 left-0 top-0 hidden w-2 bg-gradient-to-b from-amber-400 to-rose-400"
              style={
                sandboxActiveType === item[0] ? { display: "block" } : undefined
              }
            ></div>
            {/* copy/paste buttons */}
            {item[0] === sandboxActiveType && (
              <div className="absolute right-0 top-0 bg-slate-600">
                <Button
                  className="h-0 w-5"
                  variant={"ghost"}
                  size={"icon"}
                  title="from palette"
                  onClick={() =>
                    // copying color from the palette
                    setSandboxColors({
                      ...sandboxColors,
                      [sandboxActiveType]: paletteColors[paletteActiveColor],
                    })
                  }
                >
                  <ClipboardCopy className="m-0" />
                </Button>

                <Button
                  className="h-0 w-5"
                  variant={"ghost"}
                  size={"icon"}
                  title="reset"
                  onClick={() =>
                    // resetting color to the initial value from first select
                    setSandboxColors({
                      ...sandboxColors,
                      [sandboxActiveType]: resetColor,
                    })
                  }
                >
                  <ClipboardX />
                </Button>
                <Button
                  className="h-0 w-5"
                  variant={"ghost"}
                  size={"icon"}
                  title="to palette"
                  onClick={() =>
                    // updating palette active color
                    setPaletteColors(
                      paletteColors
                        .slice(0, paletteActiveColor)
                        .concat(
                          sandboxColors[sandboxActiveType],
                          paletteColors.slice(paletteActiveColor + 1),
                        ),
                    )
                  }
                >
                  <ClipboardPaste />
                </Button>
              </div>
            )}
            {/* shadcn/ui variable description */}
            <div className="rounded border bg-stone-800 px-1 text-slate-100">
              {cssVars[item[0] as TComponentTypes]}
            </div>
          </>
        </Button>
      ))}
    </>
  );
}
