import { useMemo, useState } from "react";
import { cssVars, TComponentTypes } from "../../settings";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useAtomValue } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";

export default function CopyButton() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);

  // local state for "copied" popup show/hide
  const [showPopup, setShowPopup] = useState(false);

  const text = useMemo(() => {
    return Object.entries(sandboxColors).reduce(
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
  }, [sandboxColors]);
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
        <div className="absolute -right-4 -top-4 rounded-xl border border-slate-400 bg-slate-700 p-2 text-slate-100">
          Copied!
        </div>
      )}
    </Button>
  );
}
