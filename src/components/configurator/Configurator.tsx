"use client";

import { useEffect, useState } from "react";
import { cssVars, IColorState } from "./settings";
import hslColorObjectToActualColor from "./utils/hslColorObjectToActualColor";
import colorsInit from "./utils/colorsInit";
import DisplayCard from "./components/DisplayCard";
import DisplayPopover from "./components/DisplayPopover";
import ActiveColorPanel from "./components/ActiveColorPanel";
import PopupMenus from "./components/PopupMenus";
import WideScreenSpread from "./components/WideScreenSpread";
import MainDisplay from "./components/MainDisplay";

export default function Configurator() {
  const [colorState, setColorState] = useState<IColorState>();

  useEffect(() => {
    setColorState(() => colorsInit({ cssVars }));
  }, []);

  return (
    colorState && (
      <div className="relative flex w-screen flex-1 items-center justify-center">
        <div className="hidden 2xl:block">
          <WideScreenSpread
            colorState={colorState}
            cssVars={cssVars}
            setColorState={setColorState}
          />
        </div>
        <div className="2xl:hidden">
          <MainDisplay
            colorState={colorState}
            cssVars={cssVars}
            setColorState={setColorState}
          />
        </div>
      </div>
    )
  );
}
