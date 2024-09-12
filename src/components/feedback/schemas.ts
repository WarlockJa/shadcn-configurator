import { z } from "zod";

export const messageSchema = z.object({
  topic: z.string().min(1).max(100),
  message: z.string().min(10).max(600),
});
