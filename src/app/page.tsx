import Configurator from "@/components/configurator/Configurator";
import InfoPanel from "@/components/info-panel/InfoPanel";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-600">
      <InfoPanel />
      <Configurator />
    </main>
  );
}
