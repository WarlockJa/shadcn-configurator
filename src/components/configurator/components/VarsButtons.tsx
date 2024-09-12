import { TColorsState, TComponentTypes, TCssVars } from "../settings";
import { Button } from "@/components/ui/button";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function VarsButtons({
  colors,
  setActiveColor,
  activeColor,
  cssVars,
}: {
  colors: TColorsState;
  setActiveColor: (type: TComponentTypes) => void;
  activeColor: TComponentTypes;
  cssVars: TCssVars;
}) {
  return (
    <>
      {Object.entries(colors).map((item) => (
        <Button
          key={item[0]}
          className="relative mb-1 rounded-none"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: item[1],
            }),
          }}
          onClick={() => setActiveColor(item[0] as TComponentTypes)}
        >
          <>
            <div
              className="absolute bottom-0 left-0 top-0 hidden w-2 bg-gradient-to-b from-amber-400 to-rose-400"
              style={activeColor === item[0] ? { display: "block" } : undefined}
            ></div>
            <div className="rounded border bg-stone-800 px-1 text-slate-100">
              {cssVars[item[0] as TComponentTypes]}
            </div>
          </>
        </Button>
      ))}
    </>
  );
}
