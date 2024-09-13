"use client";

import WideScreenSpread from "./components/WideScreenSpread";
import MainDisplay from "./components/sandbox-parts/MainDisplay";
import useConfigurator from "./hooks/useConfigurator";

export default function Configurator() {
  const initComplete = useConfigurator();

  return (
    initComplete && (
      <div className="relative flex w-screen flex-1 items-center justify-center">
        <div className="hidden 2xl:block">
          <WideScreenSpread />
        </div>
        <div className="2xl:hidden">
          <MainDisplay />
        </div>
      </div>
    )
  );
}
