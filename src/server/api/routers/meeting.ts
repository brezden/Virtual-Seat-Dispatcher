import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const meetingRouter = createTRPCRouter({
  getMeeting: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createSeat: publicProcedure
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

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
