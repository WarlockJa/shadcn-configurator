import { Label } from "@/components/ui/label";
import { cssVars } from "../../settings";
import { useAtomValue } from "jotai";
import { sandboxActiveTypeAtom } from "@/store/jotai";

export default function ActiveColorPanel() {
  // accessing store data
  const sandboxActiveType = useAtomValue(sandboxActiveTypeAtom);

  return (
    <Label className="flex justify-center p-2 text-xl text-slate-200">
      Active color: {cssVars[sandboxActiveType]}
    </Label>
  );
}
