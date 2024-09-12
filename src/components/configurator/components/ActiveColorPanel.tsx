import { Label } from "@/components/ui/label";
import { TComponentTypes, TCssVars } from "../settings";

export default function ActiveColorPanel({
  colorType,
  cssVars,
}: {
  colorType: TComponentTypes;
  cssVars: TCssVars;
}) {
  return (
    <Label className="flex justify-center rounded-t-lg border-2 p-2 text-xl text-slate-200">
      Active color: {cssVars[colorType]}
    </Label>
  );
}
