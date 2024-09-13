"use client";
import { useEffect, useState } from "react";
import { TColorsState } from "../settings";

export default function useDebounce(value: TColorsState, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
