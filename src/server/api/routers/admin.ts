import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "../trpc";

export const adminRouter = createTRPCRouter({
  // ADMIN ROUTES
  getAllUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  updateUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        role: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          role: input.role,
        },
      });
    }),
});
