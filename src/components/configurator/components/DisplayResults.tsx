import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DisplayColorsAsString from "./DisplayColorsAsString";
import CopyButton from "./CopyButtons";
import { Button } from "@/components/ui/button";
import { TColorsState, TCssVars } from "../settings";

export default function DisplayResults({
  colors,
  cssVars,
}: {
  colors: TColorsState;
  cssVars: TCssVars;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} className="w-full max-w-32">
          Export CSS
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-xl border bg-gradient-to-b from-slate-600 to-stone-600 p-4 text-gray-200 shadow-lg">
        <DisplayColorsAsString colors={colors} cssVars={cssVars} />
        <div className="absolute right-0 top-0">
          <CopyButton colors={colors} cssVars={cssVars} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
