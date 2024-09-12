import { Label } from "@/components/ui/label";
import { cssVars, TComponentTypes } from "../settings";

export default function ActiveColorPanel({
  colorType,
}: {
  colorType: TComponentTypes;
}) {
  return (
    <Label className="flex justify-center rounded-t-lg border-2 p-2 text-xl text-slate-200">
      Active color: {cssVars[colorType]}
    </Label>
  );
}
