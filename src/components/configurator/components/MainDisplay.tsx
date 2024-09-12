import React, { Dispatch, SetStateAction } from "react";
import { IColorState, TCssVars } from "../settings";
import ActiveColorPanel from "./ActiveColorPanel";
import PopupMenus from "./PopupMenus";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import DisplayCard from "./DisplayCard";
import DisplayPopover from "./DisplayPopover";

export default function MainDisplay({
  colorState,
  setColorState,
  cssVars,
}: {
  colorState: IColorState;
  setColorState: Dispatch<SetStateAction<IColorState | undefined>>;
  cssVars: TCssVars;
}) {
  return (
    <div className="h-full max-w-screen-lg rounded-xl border-2 border-stone-500 shadow-lg shadow-slate-800 md:p-2">
      <ActiveColorPanel colorType={colorState.type} cssVars={cssVars} />
      <div className="flex flex-wrap items-center justify-around border-x-2 p-4">
        <PopupMenus
          colorState={colorState}
          cssVars={cssVars}
          setColorState={setColorState}
        />
      </div>
      <div
        className="flex w-full flex-col justify-center gap-4 border-2 p-4 md:p-8"
        style={{
          backgroundColor: hslColorObjectToActualColor({
            hslColor: colorState.colors["background"],
          }),
        }}
      >
        <h1
          className="bold text-xl"
          style={{
            color: hslColorObjectToActualColor({
              hslColor: colorState.colors["foreground"],
            }),
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo eaque,
          deserunt eius, pariatur dolore corporis officiis, quas ad modi
          deleniti magnam doloribus molestiae! Accusamus laudantium enim ipsa?
          Blanditiis, itaque voluptatum!
        </h1>
        <DisplayCard colors={colorState.colors} />
        <DisplayPopover colors={colorState.colors} />
      </div>
    </div>
  );
}
