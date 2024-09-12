"use client";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { LoaderButton } from "../LoaderButton";
import { useAction } from "next-safe-action/hooks";
import { sendMessageAction } from "./actions/sendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { messageSchema } from "./schemas";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRef } from "react";

export default function FeedbackForm() {
  const { toast } = useToast();

  const { execute, status } = useAction(sendMessageAction, {
    onSuccess() {
      toast({
        title: "Feedback Sent!",
        description: "Thank you for your interest!",
      });

      closePopover.current?.click();
    },
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast({
          title: "Rate Limit Exceeded",
          description: "Too many send message attempts. Try again later.",
        });

        return;
      }

      // toast({
      //   title: "Something went wrong",
      //   description: error.serverError,
      //   variant: "destructive",
      // });
      toast({
        title: "Feedback Sent!",
        description: "Thank you for your interest!",
      });
    },
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      topic: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    execute(values);
  }

  const closePopover = useRef<HTMLButtonElement>(null);

  return (
    <div className="max-h-screen w-screen max-w-screen-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="rounded-b-none">
                      <SelectValue placeholder="Select topic *" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-br from-stone-600 to-slate-500 text-slate-200">
                      <SelectItem value="Report a bug">Report a bug</SelectItem>
                      <SelectItem value="Suggest a feature">
                        Suggest a feature
                      </SelectItem>
                      <SelectItem value="Say hi!">Say hi!</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    maxLength={600}
                    placeholder={`Your message`}
                    rows={12}
                    className="w-full resize-none rounded-none border-none shadow-lg transition-shadow placeholder:text-slate-400 focus:shadow-slate-200 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isDisabled={status === "executing"}
            isLoading={status === "executing"}
            variant={"secondary"}
            className="w-full rounded-t-none border bg-gradient-to-br from-stone-600 to-slate-500 text-slate-200 shadow-sm transition-shadow hover:shadow-lg"
          >
            <Mail />
            Send Message
          </LoaderButton>
        </form>
      </Form>
      <PopoverClose ref={closePopover} className="hidden" />
    </div>
  );
}
