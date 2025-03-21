"use client";

import { DndContext } from "@dnd-kit/core";
import WideScreenSpread from "./components/WideScreenSpread";
import MainDisplay from "./components/sandbox-parts/MainDisplay";
import useConfigurator from "./hooks/useConfigurator";
import useHotKeys from "./hooks/useHotKeys";

export default function Configurator() {
  const initComplete = useConfigurator();
  // hook for catching and processing hotkey presses
  useHotKeys();

  return (
    initComplete && (
      <DndContext>
        <div className="relative flex w-screen flex-1 items-center justify-center">
          <div className="hidden 2xl:block">
            <WideScreenSpread />
          </div>
          <div className="2xl:hidden">
            <MainDisplay />
          </div>
        </div>
      </DndContext>
    )
  );
}
