import CopyButton from "./primitives/CopyButtons";
import PopupWrapper from "./wrappers/PopupWrapper";
import TWColorPalette from "./primitives/TWColorPalette";
import ColorInputs from "./primitives/ColorInputs";
import VarsButtons from "./primitives/VarsButtons";
import HslColorPickerPrmitive from "./primitives/HslColorPickerPrmitive";
import ExportVars from "./primitives/ExportVars";
import ImportVars from "./primitives/ImportVars";

export default function PopupMenus() {
  return (
    <>
      <PopupWrapper label="Import Vars">
        <ImportVars />
      </PopupWrapper>
      <PopupWrapper label="Export Vars">
        <ExportVars />
        <div className="absolute right-0 top-0">
          <CopyButton />
        </div>
      </PopupWrapper>
      <PopupWrapper label="TW Palette">
        <TWColorPalette />
      </PopupWrapper>
      <PopupWrapper label="Colors">
        <HslColorPickerPrmitive />
        <ColorInputs />
      </PopupWrapper>
      <PopupWrapper label="Vars">
        <div className="flex max-h-96 flex-col overflow-scroll">
          <VarsButtons />
        </div>
      </PopupWrapper>
    </>
  );
}
