import { Loader2Icon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoaderButton({
  children,
  isLoading,
  isDisabled,
  className,
  ...props
}: ButtonProps & { isLoading?: boolean; isDisabled: boolean }) {
  return (
    <Button
      disabled={isDisabled}
      type="submit"
      {...props}
      className={cn("flex justify-center gap-2 px-3", className)}
    >
      {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
