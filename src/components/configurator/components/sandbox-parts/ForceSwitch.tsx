import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function ForceSwitch({
  label,
  forceState,
  setForceState,
  style,
}: {
  label: string;
  forceState: boolean;
  setForceState: (newState: boolean) => void;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex h-fit items-center rounded bg-cyan-900 px-1"
      style={style}
    >
      <Label htmlFor="forceHover" className="font-serif text-slate-50">
        {label}&nbsp;
      </Label>
      <Switch
        id="forceHover"
        checked={forceState}
        onCheckedChange={() => setForceState(!forceState)}
      />
    </div>
  );
}
