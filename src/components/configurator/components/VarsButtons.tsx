import { cssVars, TColorsState, TComponentTypes } from "../settings";
import { Button } from "@/components/ui/button";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function VarsButtons({
  colors,
  setActiveColor,
  activeColor,
}: {
  colors: TColorsState;
  setActiveColor: (type: TComponentTypes) => void;
  activeColor: TComponentTypes;
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
            // outline: activeColor === item[0] ? "2px solid #e1e7ef" : undefined,
            outlineOffset: "2px",
            boxShadow:
              activeColor === item[0] ? "-8px 0 8px 4px #e1e7ef" : undefined,
          }}
          onClick={() => setActiveColor(item[0] as TComponentTypes)}
        >
          <div className="rounded border bg-stone-800 px-1 text-slate-100">
            {cssVars[item[0] as TComponentTypes]}
          </div>
        </Button>
      ))}
    </>
  );
}
