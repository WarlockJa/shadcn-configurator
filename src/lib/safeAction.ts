import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e, utils) {
    console.log(e);
    // You can access these properties inside the `utils` object.
    const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;
    console.log(clientInput);
    console.log(bindArgsClientInputs);
    console.log(metadata);
    console.log(ctx);

    // returning rate limit error
    if (e.name === "RateLimitError") return e.name;
    // returning generic error message
    return e.message;
  },
});
