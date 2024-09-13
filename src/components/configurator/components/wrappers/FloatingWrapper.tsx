import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FloatingWrapper({
  children,
  offsetClass,
  label,
}: {
  children: ReactNode;
  offsetClass: string;
  label: string;
}) {
  // TODO make it draggable and possibly droppable
  return (
    <div className={cn("absolute rounded-xl border-2 p-4", offsetClass)}>
      <div className="absolute -top-3 left-4 z-30 bg-slate-600 px-2 font-serif leading-none text-slate-200">
        {label}
      </div>
      {children}
    </div>
  );
}
