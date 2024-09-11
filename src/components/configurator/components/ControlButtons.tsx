import { TColorsState, TComponentTypes } from "../settings";
import { Button } from "@/components/ui/button";
import hslColorObjectToActualColor from "../utils/hslColorObjectToActualColor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HslColor } from "react-colorful";

export default function ControlButtons({
  colors,
  setActiveColor,
}: {
  colors: TColorsState;
  setActiveColor: (type: TComponentTypes) => void;
}) {
  return (
    <Tabs defaultValue="main" className="h-fit w-60 rounded-lg border-2 p-3">
      <TabsList>
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="PSA">PSA</TabsTrigger>
        <TabsTrigger value="DRIMB">DRIMB</TabsTrigger>
      </TabsList>
      <TabContentItem
        value="main"
        colors={Object.entries(colors).slice(0, 6)}
        setActiveColor={setActiveColor}
      />
      <TabContentItem
        value="PSA"
        colors={Object.entries(colors).slice(6, 12)}
        setActiveColor={setActiveColor}
      />
      <TabContentItem
        value="DRIMB"
        colors={Object.entries(colors).slice(12)}
        setActiveColor={setActiveColor}
      />
    </Tabs>
  );
}

const TabContentItem = ({
  value,
  colors,
  setActiveColor,
}: {
  value: string;
  colors: [key: string, value: HslColor][];
  setActiveColor: (activeColor: TComponentTypes) => void;
}) => {
  return (
    <TabsContent value={value}>
      {colors.map((item) => (
        <Button
          key={item[0]}
          className="relative h-8 w-full border border-slate-400"
          style={{
            backgroundColor: hslColorObjectToActualColor({
              hslColor: item[1],
            }),
          }}
          onClick={() => setActiveColor(item[0] as TComponentTypes)}
        >
          <div className="absolute -top-1 rounded border bg-stone-800 px-1 text-slate-100">
            {item[0]}
          </div>
        </Button>
      ))}
    </TabsContent>
  );
};
