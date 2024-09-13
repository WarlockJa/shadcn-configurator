import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import hslColorObjectToActualColor from "../../utils/hslColorObjectToActualColor";
import { TColorsState } from "../../settings";
import { useAtomValue } from "jotai";
import { sandboxColorsAtom } from "@/store/jotai";

export default function DisplayPopover() {
  // accessing store data
  const sandboxColors = useAtomValue(sandboxColorsAtom);
  return (
    <Popover>
      <PopoverTrigger
        style={{
          color: hslColorObjectToActualColor({
            hslColor: sandboxColors["foreground"],
          }),
        }}
      >
        Open Popover
      </PopoverTrigger>
      <PopoverContent style={defaultPopoverStyles({ colors: sandboxColors })}>
        Popover content. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Eius eligendi ipsa amet ab qui eos numquam deserunt exercitationem
        nam, fugit delectus perspiciatis, nostrum labore officia, consequuntur
        praesentium atque recusandae possimus?
      </PopoverContent>
    </Popover>
  );
}

const defaultPopoverStyles = ({ colors }: { colors: TColorsState }) => {
  // bg-card text-card-foreground
  return {
    backgroundColor: hslColorObjectToActualColor({
      hslColor: colors["popover"],
    }),
    color: hslColorObjectToActualColor({
      hslColor: colors["popoverForeground"],
    }),
  };
};
