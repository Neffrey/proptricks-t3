// LIBRARIES
import { z } from "zod";

// COMPONENTS
import { createTRPCRouter, publicProcedure } from "../trpc";

export const publicRouter = createTRPCRouter({
  // PUBLIC ROUTES
  getAllProps: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.prop.findMany();
  }),

  getAllTrickTags: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.trickTag.findMany();
  }),

  getTricks: publicProcedure
    .input(z.object({ prop: z.string(), withTag: z.string().optional() }))
    .query(({ input, ctx }) => {
      if (input.withTag) {
        return ctx.prisma.trick.findMany({
          where: {
            prop: {
              id: input.prop,
            },
            trickTags: {
              some: {
                id: input.withTag,
              },
            },
          },
        });
      } else
        return ctx.prisma.trick.findMany({
          where: {
            prop: {
              id: input.prop,
            },
          },
        });
    }),
});
