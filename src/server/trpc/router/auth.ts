import { router, visitorProcedure, userProcedure } from "server/trpc/trpc";

export const authRouter = router({
  getSession: visitorProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: userProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
