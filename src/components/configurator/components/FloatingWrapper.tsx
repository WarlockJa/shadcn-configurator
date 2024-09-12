import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FloatingWrapper({
  children,
  offsetClass,
}: {
  children: ReactNode;
  offsetClass: string;
}) {
  // TODO make it draggable and possibly droppable
  return (
    <div className={cn("absolute rounded-xl border-2 p-4", offsetClass)}>
      {children}
    </div>
  );
}
