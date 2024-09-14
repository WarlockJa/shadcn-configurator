import { useDraggable } from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { Transform } from "@dnd-kit/utilities";
import useOffset from "./hooks/useOffset";
import { Button } from "../ui/button";
import { Pin, PinOff } from "lucide-react";
// import { TDraggableElements } from "../configurator/settings";

export default function Draggable({
  children,
  id,
  role,
  roleDescription,
  initialOffset,
}: {
  children: ReactNode;
  id: string;
  role: string;
  roleDescription?: string;
  initialOffset: Transform;
}) {
  // detecting if child node is interacted with, if so avoiding dragging
  const [childInteracted, setChildInteracted] = useState(false);
  // pin element to its current position on the screen
  const [isPinned, setIsPinned] = useState(false);
  // drag'n'drop enabling hook
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      attributes: { role, roleDescription },
      disabled: isPinned || childInteracted,
    });

  // reading transformation style for the draggable element
  // const style = useOffset(transform, initialOffset, id as TDraggableElements);
  const style = useOffset(transform, initialOffset);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        cursor: isDragging
          ? "grabbing"
          : !(isPinned || childInteracted)
            ? "grab"
            : undefined,
      }}
      {...listeners}
      {...attributes}
      className="absolute left-0 top-0 w-fit rounded-xl border-2 border-t-0 p-4"
    >
      <div className="absolute -top-3 left-4 right-4 z-30 flex select-none items-center text-nowrap px-2 font-serif leading-none text-slate-200">
        {id}
        <div className="mx-2 h-[2px] w-full bg-slate-200"></div>
        <div
          onMouseOver={() => setChildInteracted(true)}
          onMouseLeave={() => setChildInteracted(false)}
        >
          <Button
            size={"icon"}
            className="h-4 w-4 text-slate-200"
            variant={"link"}
            onClick={() => setIsPinned(!isPinned)}
          >
            {isPinned ? (
              <Pin className="h-fit" />
            ) : (
              <PinOff className="h-fit" />
            )}
          </Button>
        </div>
      </div>
      <div
        onMouseOver={() => setChildInteracted(true)}
        onMouseLeave={() => setChildInteracted(false)}
      >
        {children}
      </div>
    </div>
  );
}
