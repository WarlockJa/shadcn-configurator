"use client";

import { useEffect, useState } from "react";
import { HslColorPicker } from "react-colorful";
import { cssVars, TColorsState, TComponentTypes } from "./settings";
import hslColorObjectToActualColor from "./utils/hslColorObjectToActualColor";
import colorsInit from "./utils/colorsInit";
import VarsButtons from "./components/VarsButtons";
import DisplayCard from "./components/DisplayCard";
import DisplayPopover from "./components/DisplayPopover";
import ColorInputs from "./components/ColorInputs";
import TWColorPalette from "./components/TWColorPalette";
import PopupWrapper from "./components/PopupWrapper";
import ActiveColorPanel from "./components/ActiveColorPanel";
import DisplayColorsAsString from "./components/DisplayColorsAsString";
import CopyButton from "./components/CopyButtons";
import ImportVars from "./components/ImportVars";

// Export this on an empty page to get current values for shadcn/ui variables
export default function Configurator() {
  const [colorState, setColorState] = useState<{
    type: TComponentTypes;
    colors: TColorsState;
  }>();

  useEffect(() => {
    setColorState(() => colorsInit({ cssVars }));
  }, []);

  return (
    colorState && (
      <div className="relative w-screen max-w-screen-lg rounded-xl border-2 border-stone-500 shadow-lg shadow-slate-800 md:p-2">
        <ActiveColorPanel colorType={colorState.type} />
        {/* <div className="hidden xl:absolute xl:-right-80 xl:top-0 xl:block">
          <TWColorPalette
            setColor={(twColor) =>
              setColorState(
                (prev) =>
                  prev && {
                    ...prev,
                    colors: { ...prev.colors, [colorState.type]: twColor },
                  },
              )
            }
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <ControlButtons
            colors={colorState.colors}
            setActiveColor={(type) => setColorState({ ...color, type })}
          />
          <div className="mb-1">
            <HslColorPicker
              style={{ height: "300px", width: "300px" }}
              color={colorState.colors[colorState.type]}
              onChange={(hslColor) =>
                setColorState(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [colorState.type]: hslColor },
                    },
                )
              }
            />
          </div>
          <div className="flex-1">
            <ColorInputs
              color={colorState.colors[colorState.type]}
              setColor={(hslColor) =>
                setColorState(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [colorState.type]: hslColor },
                    },
                )
              }
            />
          </div>
        </div> */}
        <div className="flex flex-wrap items-center justify-around border-x-2 p-4">
          <PopupWrapper label="Import Vars">
            <ImportVars
              colors={colorState.colors}
              setColors={(colors) => {
                // console.log(colors);
                setColorState((prev) => prev && { ...prev, colors });
              }}
            />
          </PopupWrapper>
          <PopupWrapper label="Export Vars">
            <DisplayColorsAsString
              colors={colorState.colors}
              cssVars={cssVars}
            />
            <div className="absolute right-0 top-0">
              <CopyButton colors={colorState.colors} cssVars={cssVars} />
            </div>
          </PopupWrapper>
          <PopupWrapper label="TW Palette">
            <TWColorPalette
              setColor={(twColor) =>
                setColorState(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [colorState.type]: twColor },
                    },
                )
              }
            />
          </PopupWrapper>
          <PopupWrapper label="Colors">
            <HslColorPicker
              color={colorState.colors[colorState.type]}
              onChange={(hslColor) =>
                setColorState(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [colorState.type]: hslColor },
                    },
                )
              }
            />
            <ColorInputs
              color={colorState.colors[colorState.type]}
              setColor={(hslColor) =>
                setColorState(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [colorState.type]: hslColor },
                    },
                )
              }
            />
          </PopupWrapper>
          <PopupWrapper label="Vars">
            <div className="flex flex-col">
              <VarsButtons
                colors={colorState.colors}
                activeColor={colorState.type}
                setActiveColor={(type) =>
                  setColorState({ ...colorState, type })
                }
              />
            </div>
          </PopupWrapper>
        </div>
        <div
          className="flex w-full flex-col justify-center gap-4 border-2 p-4 md:p-8"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: colorState.colors["background"],
            }),
          }}
        >
          <h1
            className="bold text-xl"
            style={{
              color: hslColorObjectToActualColor({
                hslColor: colorState.colors["foreground"],
              }),
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            eaque, deserunt eius, pariatur dolore corporis officiis, quas ad
            modi deleniti magnam doloribus molestiae! Accusamus laudantium enim
            ipsa? Blanditiis, itaque voluptatum!
          </h1>
          <DisplayCard colors={colorState.colors} />
          <DisplayPopover colors={colorState.colors} />
        </div>
      </div>
    )
  );
}
