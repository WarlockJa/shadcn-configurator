import React from "react";
import ActiveColorPanel from "../primitives/ActiveColorPanel";
import PopupMenus from "../PopupMenus";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import DisplayCard from "./DisplayCard";
import DisplayPopover from "./DisplayPopover";
import { useAtomValue } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";
import Palette from "../primitives/Palette";

export default function MainDisplay() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);

  return (
    <div className="h-full max-w-screen-lg rounded-xl border-2 border-stone-500 shadow-lg shadow-slate-800 md:p-2">
      <div className="flex flex-col items-center justify-around rounded-t-lg border-2 md:flex-row">
        <ActiveColorPanel />
        <div className="pb-1 2xl:hidden">
          <Palette />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-around border-x-2 p-4 2xl:hidden">
        <PopupMenus />
      </div>
      <div
        className="flex w-full flex-col justify-center gap-4 border-2 p-4 md:p-8"
        style={{
          backgroundColor: hslColorObjectToActualColor({
            hslColor: sandboxColors["background"],
          }),
        }}
      >
        <h1
          className="bold text-xl"
          style={{
            color: hslColorObjectToActualColor({
              hslColor: sandboxColors["foreground"],
            }),
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo eaque,
          deserunt eius, pariatur dolore corporis officiis, quas ad modi
          deleniti magnam doloribus molestiae! Accusamus laudantium enim ipsa?
          Blanditiis, itaque voluptatum!
        </h1>
        <DisplayCard />
        <DisplayPopover />
      </div>
    </div>
  );
}
