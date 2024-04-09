import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { db } from '@/db'
import { getUserFromSession } from '@/lib/auth'

import { privateProcedure, procedure, router } from './trpc'

export const appRouter = router({
  // test: procedure.query(() => {
  //   return 'hello'
  // }),
  authCallback: procedure.query(async () => {
    const user = await getUserFromSession()

    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    // check if user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    const files = await db.file.findMany({
      where: {
        userId,
      },
    })

    return files
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await db.file.delete({
        where: {
          id: input.id,
        },
      })

      return file
    }),
})

export type AppRouter = typeof appRouter
