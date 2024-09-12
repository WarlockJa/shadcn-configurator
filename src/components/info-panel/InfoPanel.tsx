import Link from "next/link";
import { Button } from "../ui/button";
import GitHubIcon from "../icons/GitHubIcon";
import BuyMeCoffee from "../icons/BuyMeCoffee";
import { Mail } from "lucide-react";
import FeedbackForm from "../feedback/FeedbackForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// // attaching SheetClose to menu items
// const SheetMenuItem = ({
//   withSheetClose,
//   children,
// }: {
//   withSheetClose?: boolean;
//   children: ReactNode;
// }) => {
//   const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
//     ? [SheetClose, { asChild: true }]
//     : [React.Fragment, undefined];
//   return (
//     <div className="hover:bg-accent">
//       <SheetCloseWrapper {...sheetCloseWrapperProps}>
//         {children}
//       </SheetCloseWrapper>
//     </div>
//   );
// };

// const PopoverWithCloseWrapper = ({children}:{children: ReactNode}) => {
//   const [PopoverCloseWrapper] = [PopoverClose]
// }

export default function InfoPanel() {
  return (
    <div className="flex w-full flex-col items-center justify-between bg-gradient-to-r from-slate-600 to-cyan-950 p-4 md:flex-row">
      <h1 className="font-mono text-3xl text-slate-200">shadcn-config</h1>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"link"} className="text-slate-200">
              <Mail className="h-6 w-6" /> &nbsp;Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-2 rounded-xl border bg-gradient-to-b from-slate-600 to-stone-600 p-4 text-gray-200 shadow-lg">
            <FeedbackForm />
          </PopoverContent>
        </Popover>

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
