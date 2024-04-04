import { TRPCError } from '@trpc/server'

import { getUserFromSession } from '@/lib/auth'

import { procedure, router } from './trpc'

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

    return { success: true }
  }),
})

export type AppRouter = typeof appRouter
