"use client";

import { setLocalStorageData } from "@/lib/local-storage/utils";
import { getLocalStorageData } from "@/lib/local-storage/utils";
import {
  draggableElementsDataAtom,
  paletteActiveColorAtom,
  paletteColorsAtom,
  sandboxActiveTypeAtom,
  sandboxColorsAtom,
  staticDraggableElementsDataAtom,
} from "@/store/jotai";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import configuratorInit from "../utils/configuratorInit";
import { cssVars } from "../settings";

export default function useConfigurator() {
  // initialisation flag
  const [initComplete, setInitComplete] = useState<boolean>(false);
  // jotai store data
  const [sandboxColors, setSandboxColors] = useAtom(sandboxColorsAtom);
  const [sandboxActiveType, setSandboxActiveType] = useAtom(
    sandboxActiveTypeAtom,
  );
  const [paletteColors, setPaletteColors] = useAtom(paletteColorsAtom);
  const [paletteActiveColor, setPaletteActiveColor] = useAtom(
    paletteActiveColorAtom,
  );
  // const draggableElementsData = useAtomValue(draggableElementsDataAtom);
  const [draggableElementsData, setDraggableElementsData] = useAtom(
    draggableElementsDataAtom,
  );
  const setStaticDraggableElementsData = useSetAtom(
    staticDraggableElementsDataAtom,
  );

  // initialisation
  useEffect(() => {
    // reading stored configurator data from localStorage
    // if no data found, or data corrupt settling for default values
    const data = getLocalStorageData();
    if (data) {
      setSandboxColors(data.colors);
      setSandboxActiveType(data.type);
      setPaletteColors(data.paletteColors);
      setPaletteActiveColor(data.paletteActiveColor);

      setDraggableElementsData(data.draggableElementsData);
      setStaticDraggableElementsData(data.draggableElementsData);
    } else {
      // generating default values
      const { type, colors } = configuratorInit({ cssVars });
      setSandboxColors(colors);
      setSandboxActiveType(type);
      // not generating default values for the palette and draggable positions
      // because they are already set as default in jotai store
    }

    setInitComplete(true);
  }, []);

  // saving changes in localStorage on data change
  useEffect(() => {
    if (!initComplete) return;

    setLocalStorageData({
      colors: sandboxColors,
      type: sandboxActiveType,
      paletteColors,
      paletteActiveColor,
      draggableElementsData,
    });
  }, [
    sandboxActiveType,
    sandboxColors,
    paletteColors,
    paletteActiveColor,
    draggableElementsData,
  ]);

  return initComplete;
}
