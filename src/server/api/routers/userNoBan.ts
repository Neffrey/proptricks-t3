import { z } from "zod";

import { createTRPCRouter, userNoBanProcedure } from "../trpc";

export const userNoBanRouter = createTRPCRouter({
  // TRICK ROUTES
  addTrick: userNoBanProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  // getAll: visitorProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
  // getAll: visitorProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
