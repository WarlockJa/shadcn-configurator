"use client";

import { TDraggableElements } from "@/components/configurator/settings";
import { draggableElementsDataAtom } from "@/store/jotai";
import { CSS, Transform } from "@dnd-kit/utilities";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

export default function useOffset(
  transform: Transform | null,
  initialOffset: Transform,
  id: TDraggableElements,
) {
  const [offset, setOffset] = useState<{
    current: Transform;
    previous: Transform;
  }>({ current: initialOffset, previous: initialOffset });
  // store data
  const [draggableElementsData, setDraggableElementsData] = useAtom(
    draggableElementsDataAtom,
  );

  useEffect(() => {
    if (transform) {
      setOffset((prev) => ({ ...prev, current: transform }));
    } else {
      setOffset((prev) => ({
        ...prev,
        previous: combineTransforms(prev.current, prev.previous),
      }));

      setDraggableElementsData({
        ...draggableElementsData,
        [id]: combineTransforms(offset.current, offset.previous, true),
      });
    }
  }, [transform]);

  const style = useMemo(
    () =>
      transform
        ? {
            transform: CSS.Translate.toString(
              combineTransforms(offset.previous, transform),
            ),
          }
        : { transform: CSS.Translate.toString(offset.previous) },
    [transform, CSS.Translate.toString(offset.previous)],
  );

  return style;
}

const combineTransforms = (
  transform1: Transform,
  transform2: Transform,
  divide?: boolean,
): Transform => {
  return divide
    ? {
        x: transform1.x / 2 + transform2.x / 2,
        y: transform1.y / 2 + transform2.y / 2,
        scaleY: 1,
        scaleX: 1,
      }
    : {
        x: transform1.x + transform2.x,
        y: transform1.y + transform2.y,
        scaleY: 1,
        scaleX: 1,
      };
};
