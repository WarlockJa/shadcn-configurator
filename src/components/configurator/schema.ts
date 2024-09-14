import { z } from "zod";
import {
  cssVars,
  IConfiguratorState,
  paletteSize,
  defaultDraggableElementsData,
  TDraggableElements,
} from "./settings";
import { colord } from "colord";
import { HslColor } from "react-colorful";
import { Transform } from "@dnd-kit/utilities";

export const schemaIConfiguratorState = z.custom<IConfiguratorState>((val) => {
  const cssVarsKeys = Object.keys(cssVars);
  try {
    // checking type
    if (!cssVarsKeys.includes(val.type)) return false;

    // checking colors
    cssVarsKeys.forEach((item) => {
      if (!colord(val.colors[item]).isValid()) throw new Error();
    });

    // checking paletteActiveColor
    if (
      isNaN(val.paletteActiveColor) ||
      val.paletteActiveColor > paletteSize - 1 ||
      val.paletteActiveColor < 0
    )
      return false;

    // checking paletteColors
    val.paletteColors.forEach((item: HslColor) => {
      if (!colord(item).isValid()) throw new Error();
    });

    // checking draggable elements positions
    const defaultDraggableElementsDataEntries = Object.entries(
      defaultDraggableElementsData,
    );
    const localStorageDraggableElementsDataEntries = Object.entries(
      val.draggableElementsData,
    ) as [TDraggableElements, Transform][];
    if (
      defaultDraggableElementsDataEntries.length !==
      localStorageDraggableElementsDataEntries.length
    )
      return false;

    defaultDraggableElementsDataEntries.forEach((item) => {
      if (!val.draggableElementsData[item[0]]) return false;

      if (
        isNaN(val.draggableElementsData[item[0]].x) ||
        isNaN(val.draggableElementsData[item[0]].y) ||
        isNaN(val.draggableElementsData[item[0]].scaleX) ||
        isNaN(val.draggableElementsData[item[0]].scaleY)
      )
        return false;
    });
  } catch (error) {
    return false;
  }

  return true;
});
