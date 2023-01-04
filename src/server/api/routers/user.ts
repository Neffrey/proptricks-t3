import { z } from "zod";

import { createTRPCRouter, userProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  // USER ROUTES
  getMyUser: userProcedure.input(z.void()).query(({ ctx }) => {
    if (ctx.session.user.id) return ctx.session.user;
    // ctx.prisma.user.findUnique({
    //   where: { id: ctx.session.user.id },
    // });
    else return null;
  }),
  changeName: userProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, { message: "name must be at least 3 characters long" })
          .max(20, { message: "name must be 20 characters or less" }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
        },
      });
    }),
});
