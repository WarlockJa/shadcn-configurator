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
        <Button className="w-full max-w-32 border border-slate-700 bg-gradient-to-br from-stone-600 to-slate-500 shadow-sm transition-shadow hover:shadow-lg">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-2 rounded-xl border bg-gradient-to-b from-slate-600 to-stone-600 p-4 text-gray-200 shadow-lg">
        {children}
      </PopoverContent>
    </Popover>
  );
}
