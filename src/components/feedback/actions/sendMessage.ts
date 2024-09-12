"use server";

// website feedback form

import { rateLimitByIp } from "@/lib/rate-limiting/limiters";
import { actionClient } from "@/lib/safeAction";
import { flattenValidationErrors } from "next-safe-action";
import { messageSchema } from "../schemas";
import { feedbackEmail } from "@/emails/feedbackEmail";
import { env } from "@/lib/env.mjs";

export const sendMessageAction = actionClient
  .schema(messageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { topic, message } }) => {
    await rateLimitByIp({
      key: "sendMessage",
      limit: 3,
      window: 24 * 60 * 60 * 1000,
    });

    // message to website owner
    const emailOwner = fetch(env.SMTP_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.SMTP_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "shadcn-config",
          email: "feedback@shadcn-config.com",
        },
        to: [
          {
            email: "feedback@shadcn-config.com",
            name: "shadcn-config",
          },
        ],
        subject: `SCF: ${topic}`,
        htmlContent: feedbackEmail({
          userMessage: message,
        }),
      }),
    });

    // processing promises
    await Promise.all([emailOwner]);
  });
