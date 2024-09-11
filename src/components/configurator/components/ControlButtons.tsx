import { TColorsState, TComponentTypes } from "../settings";
import { Button } from "@/components/ui/button";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";

export default function ControlButtons({
  colors,
  setActiveColor,
}: {
  colors: TColorsState;
  setActiveColor: (type: TComponentTypes) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(colors).map((item) => (
        <Button
          key={item[0]}
          className="border border-slate-400"
          style={{
            backgroundColor: hslColorObjectToActualColor({ hslColor: item[1] }),
          }}
          onClick={() => setActiveColor(item[0] as TComponentTypes)}
        >
          <div className="rounded bg-stone-800 px-1 text-slate-100">
            {item[0]}
          </div>
        </Button>
      ))}
    </div>
  );
}
