import React from "react";
import { IColorState, TCssVars } from "../settings";
import PopupWrapper from "./PopupWrapper";
import ImportVars from "./ImportVars";
import DisplayColorsAsString from "./DisplayColorsAsString";
import CopyButton from "./CopyButtons";
import FloatingWrapper from "./FloatingWrapper";
import VarsButtons from "./VarsButtons";
import { HslColorPicker } from "react-colorful";
import ColorInputs from "./ColorInputs";
import MainDisplay from "./MainDisplay";
import TWColorPalette from "./TWColorPalette";

export default function WideScreenSpread({
  colorState,
  setColorState,
  cssVars,
}: {
  colorState: IColorState;
  setColorState: (newColorState: IColorState) => void;
  cssVars: TCssVars;
}) {
  return (
    <>
      <FloatingWrapper offsetClass="left-4 top-2">
        <div className="flex h-fit flex-col overflow-scroll">
          <VarsButtons
            colors={colorState.colors}
            activeColor={colorState.type}
            setActiveColor={(type) => setColorState({ ...colorState, type })}
            cssVars={cssVars}
          />
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="right-4 top-2">
        <HslColorPicker
          color={colorState.colors[colorState.type]}
          style={{ width: "300px", height: "300px", marginBottom: "1em" }}
          onChange={(hslColor) =>
            setColorState({
              ...colorState,
              colors: { ...colorState.colors, [colorState.type]: hslColor },
            })
          }
        />
        <ColorInputs
          color={colorState.colors[colorState.type]}
          setColor={(hslColor) =>
            setColorState({
              ...colorState,
              colors: { ...colorState.colors, [colorState.type]: hslColor },
            })
          }
        />
        <div className="mt-2">
          <PopupWrapper label="TW Palette">
            <TWColorPalette
              setColor={(twColor) =>
                setColorState({
                  ...colorState,
                  colors: { ...colorState.colors, [colorState.type]: twColor },
                })
              }
            />
          </PopupWrapper>
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="right-4 bottom-16">
        <div className="flex gap-2">
          <PopupWrapper label="Import Vars">
            <ImportVars
              colors={colorState.colors}
              setColors={(colors) => setColorState({ ...colorState, colors })}
              cssVars={cssVars}
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
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="left-96 top-2">
        <MainDisplay
          colorState={colorState}
          cssVars={cssVars}
          setColorState={setColorState}
        />
      </FloatingWrapper>
    </>
  );
}
