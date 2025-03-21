import Configurator from "@/components/configurator/Configurator";
import InfoPanel from "@/components/info-panel/InfoPanel";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-600">
      <InfoPanel />
      <Configurator />
    </main>
  );
}
