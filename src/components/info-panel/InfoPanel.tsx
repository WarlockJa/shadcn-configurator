import Link from "next/link";
import { Button } from "../ui/button";
import GitHubIcon from "../icons/GitHubIcon";
import BuyMeCoffee from "../icons/BuyMeCoffee";

export default function InfoPanel() {
  return (
    <div className="flex w-full flex-col items-center justify-between bg-gradient-to-r from-slate-600 to-cyan-950 p-4 md:flex-row">
      {/* <div className="flex w-full flex-col items-center justify-between bg-gradient-to-r from-slate-600 to-cyan-950 p-4 md:flex-row"> */}
      <h1 className="text-3xl text-slate-200">shadcn-config</h1>
      <div className="flex items-center gap-2">
        <Button asChild variant={"link"}>
          <Link
            href={"https://github.com/WarlockJa/shadcn-configurator"}
            target="_blank"
            className="text-slate-300"
          >
            <GitHubIcon className="h-6 w-6 fill-slate-200" /> &nbsp;Source
          </Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link
            href={"https://buymeacoffee.com/warlockja"}
            target="_blank"
            className="text-slate-300"
          >
            <BuyMeCoffee className="h-6 w-6 fill-slate-200" /> &nbsp;Buy me a
            coffee
          </Link>
        </Button>
      </div>
    </div>
  );
}
