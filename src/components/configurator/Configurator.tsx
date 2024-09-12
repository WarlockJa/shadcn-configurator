"use client";

import { useEffect, useState } from "react";
import { cssVars, IColorState } from "./settings";
import colorsInit from "./utils/colorsInit";
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
