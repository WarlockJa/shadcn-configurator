import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

export default function PopupWrapper({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full max-w-32">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-2 rounded-xl border bg-gradient-to-b from-slate-600 to-stone-600 p-4 text-gray-200 shadow-lg">
        {children}
      </PopoverContent>
    </Popover>
  );
}
