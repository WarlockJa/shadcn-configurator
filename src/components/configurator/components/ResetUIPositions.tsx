"use client";
import { Button } from "@/components/ui/button";
import { draggableElementsDataAtom } from "@/store/jotai";
import { useSetAtom } from "jotai";
import { defaultDraggableElementsData } from "../settings";

export default function ResetUIPositions() {
  // store data
  const setDraggableElementsData = useSetAtom(draggableElementsDataAtom);
  return (
    <Button
      onClick={() => {
        setDraggableElementsData(defaultDraggableElementsData);
        window.location.reload();
      }}
      variant={"link"}
      className="text-slate-200"
    >
      Reset UI Positions
    </Button>
  );
}
