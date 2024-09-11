import { useMemo, useState } from "react";
import { TColorsState, TComponentTypes, TCssVars } from "../settings";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function CopyButton({
  colors,
  cssVars,
}: {
  colors: TColorsState;
  cssVars: TCssVars;
}) {
  const [showPopup, setShowPopup] = useState(false);

  const text = useMemo(() => {
    return Object.entries(colors).reduce(
      (result, current) =>
        result.concat(
          cssVars[current[0] as TComponentTypes],
          ": ",
          hslColorObjectToActualColor({
            hslColor: current[1],
            exporting: true,
          }),
          "\n",
        ),
      "",
    );
  }, [colors]);
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      title="copy"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 600);
      }}
      className="relative"
    >
      <Copy />
      {showPopup && (
        <div className="absolute -right-4 -top-4 rounded-xl bg-slate-800 p-2 text-slate-100">
          Copied!
        </div>
      )}
    </Button>
  );
}
