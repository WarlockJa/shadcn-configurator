import React from "react";
import PopupWrapper from "./wrappers/PopupWrapper";
import CopyButton from "./primitives/CopyButtons";
import VarsButtons from "./primitives/VarsButtons";
import ColorInputs from "./primitives/ColorInputs";
import MainDisplay from "./sandbox-parts/MainDisplay";
import TWColorPalette from "./primitives/TWColorPalette";
import Palette from "./primitives/Palette";
import HslColorPickerPrmitive from "./primitives/HslColorPickerPrmitive";
import ExportVars from "./primitives/ExportVars";
import ImportVars from "./primitives/ImportVars";
import Draggable from "@/components/dragndrop/Draggable";
import { useAtomValue } from "jotai";
import { staticDraggableElementsDataAtom } from "@/store/jotai";

export default function WideScreenSpread() {
  const staticDraggableElementsData = useAtomValue(
    staticDraggableElementsDataAtom,
  );
  return (
    <>
      <Draggable
        initialOffset={staticDraggableElementsData["sandbox"]}
        id="sandbox"
        role="sandbox"
      >
        <MainDisplay />
      </Draggable>
      <Draggable
        initialOffset={staticDraggableElementsData["shadcn/ui variables"]}
        id="shadcn/ui variables"
        role="shadcn/ui variables"
      >
        <div className="flex h-fit flex-col">
          <VarsButtons />
        </div>
      </Draggable>
      <Draggable
        initialOffset={staticDraggableElementsData["colors"]}
        id="colors"
        role="colors"
      >
        <div className="flex flex-col gap-2">
          <HslColorPickerPrmitive />
          <ColorInputs />
          <PopupWrapper label="TW Palette">
            <TWColorPalette />
          </PopupWrapper>
        </div>
      </Draggable>
      <Draggable
        initialOffset={staticDraggableElementsData["import/export"]}
        id="import/export"
        role="import/export"
      >
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
      </Draggable>

      <Draggable
        initialOffset={staticDraggableElementsData["palette"]}
        id="palette"
        role="palette"
      >
        <Palette />
      </Draggable>
    </>
  );
}
