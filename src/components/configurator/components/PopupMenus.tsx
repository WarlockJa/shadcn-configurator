import { HslColorPicker } from "react-colorful";
import CopyButton from "./CopyButtons";
import ImportVars from "./ImportVars";
import PopupWrapper from "./PopupWrapper";
import TWColorPalette from "./TWColorPalette";
import ColorInputs from "./ColorInputs";
import VarsButtons from "./VarsButtons";
import { IColorState, TCssVars } from "../settings";
import { Dispatch, SetStateAction } from "react";
import DisplayColorsAsString from "./DisplayColorsAsString";

export default function PopupMenus({
  colorState,
  setColorState,
  cssVars,
}: {
  colorState: IColorState;
  setColorState: Dispatch<SetStateAction<IColorState | undefined>>;
  cssVars: TCssVars;
}) {
  return (
    <>
      <PopupWrapper label="Import Vars">
        <ImportVars
          colors={colorState.colors}
          setColors={(colors) =>
            setColorState((prev) => prev && { ...prev, colors })
          }
          cssVars={cssVars}
        />
      </PopupWrapper>
      <PopupWrapper label="Export Vars">
        <DisplayColorsAsString colors={colorState.colors} cssVars={cssVars} />
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
        <div className="flex max-h-96 flex-col overflow-scroll">
          <VarsButtons
            colors={colorState.colors}
            activeColor={colorState.type}
            setActiveColor={(type) => setColorState({ ...colorState, type })}
            cssVars={cssVars}
          />
        </div>
      </PopupWrapper>
    </>
  );
}
