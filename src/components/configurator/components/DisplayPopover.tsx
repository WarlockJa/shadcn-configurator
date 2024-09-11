import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import { TColorsState } from "../settings";

export default function DisplayPopover({ colors }: { colors: TColorsState }) {
  return (
    <Popover>
      <PopoverTrigger
        style={{
          color: hslColorObjectToActualColor({
            hslColor: colors["foreground"],
          }),
        }}
      >
        Open Popover
      </PopoverTrigger>
      <PopoverContent style={defaultPopoverStyles({ colors: colors })}>
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
