import React from "react";
import PopupWrapper from "./wrappers/PopupWrapper";
import CopyButton from "./primitives/CopyButtons";
import FloatingWrapper from "./wrappers/FloatingWrapper";
import VarsButtons from "./primitives/VarsButtons";
import ColorInputs from "./primitives/ColorInputs";
import MainDisplay from "./sandbox-parts/MainDisplay";
import TWColorPalette from "./primitives/TWColorPalette";
import Palette from "./primitives/Palette";
import HslColorPickerPrmitive from "./primitives/HslColorPickerPrmitive";
import ExportVars from "./primitives/ExportVars";
import ImportVars from "./primitives/ImportVars";

export default function WideScreenSpread() {
  return (
    <>
      <FloatingWrapper offsetClass="left-4 top-4" label="shadcn/ui variables">
        <div className="flex h-fit flex-col">
          <VarsButtons />
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="right-4 top-4" label="colors">
        <HslColorPickerPrmitive />
        <ColorInputs />
        <div className="mt-2">
          <PopupWrapper label="TW Palette">
            <TWColorPalette />
          </PopupWrapper>
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="right-4 bottom-16" label="import/export">
        <div className="flex gap-2">
          <PopupWrapper label="Import Vars">
            <ImportVars />
          </PopupWrapper>
          <PopupWrapper label="Export Vars">
            <ExportVars />
            <div className="absolute right-0 top-0">
              <CopyButton />
            </div>
          </PopupWrapper>
        </div>
      </FloatingWrapper>
      <FloatingWrapper offsetClass="left-96 top-4" label="sandbox">
        <MainDisplay />
      </FloatingWrapper>
      <FloatingWrapper offsetClass="right-4 bottom-40" label="palette">
        <Palette />
      </FloatingWrapper>
    </>
  );
}
