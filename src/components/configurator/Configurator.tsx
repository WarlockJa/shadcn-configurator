"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { HslColorPicker } from "react-colorful";
import { cssVars, TColorsState, TComponentTypes } from "./settings";
import hslColorObjectToActualColor from "./utils/hslColorObjectToActualColor";
import DisplayButtons from "./components/DisplayButtons";
import DisplayInputs from "./components/DisplayInputs";
import DisplayColorsAsString from "./components/DisplayColorsAsString";
import colorsInit from "./utils/colorsInit";
import ControlButtons from "./components/ControlButtons";
import CopyButton from "./components/CopyButtons";

// Export this on an empty page to get current values for shadcn/ui variables
export default function Configurator() {
  const [color, setColor] = useState<{
    type: TComponentTypes;
    colors: TColorsState;
  }>();

  useEffect(() => {
    setColor(() => colorsInit({ cssVars }));
  }, []);

  return (
    color && (
      <div className="max-w-screen-lg rounded-xl border-2 border-stone-500 p-8 shadow-lg shadow-slate-800">
        <div>
          <div className="flex flex-wrap">
            <ControlButtons
              colors={color.colors}
              setActiveColor={(type) => setColor({ ...color, type })}
            />
          </div>
          <div className="flex">
            <HslColorPicker
              className="m-4"
              color={color.colors[color.type]}
              onChange={(hslColor) =>
                setColor(
                  (prev) =>
                    prev && {
                      ...prev,
                      colors: { ...prev.colors, [color.type]: hslColor },
                    },
                )
              }
            />
            <Popover>
              <PopoverTrigger>
                <Button variant={"outline"}>Show CSS Variables</Button>
              </PopoverTrigger>
              <PopoverContent className="m-[1px] rounded-xl border bg-gradient-to-b from-slate-600 to-stone-600 p-4 text-gray-200 shadow-lg hover:m-0 hover:border-2">
                <DisplayColorsAsString
                  colors={color.colors}
                  cssVars={cssVars}
                />
                <div className="absolute right-0 top-0">
                  <CopyButton colors={color.colors} cssVars={cssVars} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          className="flex w-full flex-col justify-center gap-4 border-2 p-8"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: color.colors["background"],
            }),
          }}
        >
          <h1
            className="bold text-xl"
            style={{
              color: hslColorObjectToActualColor({
                hslColor: color.colors["foreground"],
              }),
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            eaque, deserunt eius, pariatur dolore corporis officiis, quas ad
            modi deleniti magnam doloribus molestiae! Accusamus laudantium enim
            ipsa? Blanditiis, itaque voluptatum!
          </h1>
          <Card style={defaultCardStyles({ colors: color.colors })}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription
                style={{
                  color: hslColorObjectToActualColor({
                    hslColor: color.colors["mutedForeground"],
                  }),
                }}
              >
                Card description. Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Dolorem dignissimos porro magni natus.
                Repellendus placeat voluptatibus natus enim omnis facere
                repudiandae expedita recusandae! Minus aperiam laudantium, iure
                aut earum sit?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DisplayButtons colors={color.colors} />
              <DisplayInputs colors={color.colors} />
            </CardContent>
          </Card>
          <Popover>
            <PopoverTrigger
              style={{
                color: hslColorObjectToActualColor({
                  hslColor: color.colors["foreground"],
                }),
              }}
            >
              Open
            </PopoverTrigger>
            <PopoverContent
              style={defaultPopoverStyles({ colors: color.colors })}
            >
              Popover content. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eius eligendi ipsa amet ab qui eos numquam
              deserunt exercitationem nam, fugit delectus perspiciatis, nostrum
              labore officia, consequuntur praesentium atque recusandae
              possimus?
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  );
}

const defaultCardStyles = ({ colors }: { colors: TColorsState }) => {
  // bg-card text-card-foreground
  return {
    backgroundColor: hslColorObjectToActualColor({ hslColor: colors["card"] }),
    color: hslColorObjectToActualColor({ hslColor: colors["cardForeground"] }),
  };
};

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
