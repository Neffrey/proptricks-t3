import { createTRPCRouter } from "./trpc";
import { publicRouter } from "./routers/public";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  public: publicRouter,
  user: userRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
