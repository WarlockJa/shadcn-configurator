"use client";

import { useEffect, useState } from "react";
import { HslColorPicker } from "react-colorful";
import { cssVars, TColorsState, TComponentTypes } from "./settings";
import hslColorObjectToActualColor from "./utils/hslColorObjectToActualColor";
import colorsInit from "./utils/colorsInit";
import ControlButtons from "./components/ControlButtons";
import DisplayResults from "./components/DisplayResults";
import DisplayCard from "./components/DisplayCard";
import DisplayPopover from "./components/DisplayPopover";
import ColorInputs from "./components/ColorInputs";
import {
  TWColorPalette,
  TWColorPalettePopup,
} from "./components/TWColorPalette";

// Export this on an empty page to get current values for shadcn/ui variables
export default function Configurator() {
  const [color, setColor] = useState<{
    type: TComponentTypes;
    colors: TColorsState;
  }>();

  useEffect(() => {
    setColor(() => colorsInit({ cssVars }));
  }, []);

  return (
    color && (
      <div className="relative w-screen max-w-screen-lg rounded-xl border-2 border-stone-500 shadow-lg shadow-slate-800 md:p-2">
        <div className="hidden xl:absolute xl:-right-80 xl:top-0 xl:block">
          <TWColorPalette
            setColor={(twColor) =>
              setColor(
                (prev) =>
                  prev && {
                    ...prev,
                    colors: { ...prev.colors, [color.type]: twColor },
                  },
              )
            }
          />
        </div>
        {/* <div className="hidden xl:absolute xl:-left-80 xl:top-0 xl:block">
          <TWColorPalette
            setColor={(twColor) =>
              setColor(
                (prev) =>
                  prev && {
                    ...prev,
                    colors: { ...prev.colors, [color.type]: twColor },
                  },
              )
            }
          />
        </div> */}
        <div className="flex flex-col md:flex-row">
          <ControlButtons
            colors={color.colors}
            setActiveColor={(type) => setColor({ ...color, type })}
          />
          <div className="mb-1">
            <HslColorPicker
              style={{ height: "300px", width: "300px" }}
              color={color.colors[color.type]}
              onChange={(hslColor) =>
                setColor(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [color.type]: hslColor },
                    },
                )
              }
            />
          </div>
          <div className="flex-1">
            <ColorInputs
              color={color.colors[color.type]}
              setColor={(hslColor) =>
                setColor(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [color.type]: hslColor },
                    },
                )
              }
            />
            <div className="mt-2 flex items-center justify-around rounded-lg border-2 p-4 lg:hidden">
              <DisplayResults colors={color.colors} cssVars={cssVars} />
              <TWColorPalettePopup
                setColor={(twColor) =>
                  setColor(
                    (prev) =>
                      prev && {
                        ...prev,
                        colors: { ...prev.colors, [color.type]: twColor },
                      },
                  )
                }
              />
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col justify-center gap-4 border-2 p-8"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: color.colors["background"],
            }),
          }}
        >
          <h1
            className="bold text-xl"
            style={{
              color: hslColorObjectToActualColor({
                hslColor: color.colors["foreground"],
              }),
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            eaque, deserunt eius, pariatur dolore corporis officiis, quas ad
            modi deleniti magnam doloribus molestiae! Accusamus laudantium enim
            ipsa? Blanditiis, itaque voluptatum!
          </h1>
          <DisplayCard colors={color.colors} />
          <DisplayPopover colors={color.colors} />
        </div>
      </div>
    )
  );
}
