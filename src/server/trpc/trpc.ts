import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "server/trpc/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const visitorProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isUser = t.middleware(({ ctx, next }) => {
  if (
    !ctx.session ||
    !ctx.session.user ||
    (ctx.session.user.role !== "user" && ctx.session.user.role !== "admin")
  ) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user || ctx.session.user.role !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected procedures
 **/
export const userProcedure = t.procedure.use(isUser);
export const adminProcedure = t.procedure.use(isAdmin);
