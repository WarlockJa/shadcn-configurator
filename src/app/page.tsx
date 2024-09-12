import Configurator from "@/components/configurator/Configurator";
import InfoPanel from "@/components/info-panel/InfoPanel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-600 via-cyan-900 to-stone-700">
      <InfoPanel />
      <Configurator />
    </main>
  );
}
