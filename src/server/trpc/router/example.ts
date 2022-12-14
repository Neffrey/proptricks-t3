import { z } from "zod";

import { router, visitorProcedure } from "server/trpc/trpc";

export const exampleRouter = router({
  hello: visitorProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  // getAll: visitorProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
