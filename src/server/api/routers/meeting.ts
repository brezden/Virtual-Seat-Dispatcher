import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const meetingRouter = createTRPCRouter({
  testProtectedRoutes: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createSeat: protectedProcedure
  .input(z.object({ userEmail: z.string().min(1), startDate: z.date(), endDate: z.date().optional(), allDay: z.boolean().optional(), location: z.number(), guests: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.booking.create({
        data: {
          userEmail: input.userEmail,
          startDate: input.startDate,
          endDate: input.endDate,
          allDay: input.allDay,
          location: input.location,
          guests: input.guests,
        },
      });
    }),
});
