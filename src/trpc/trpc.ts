import { initTRPC, TRPCError } from '@trpc/server'

import { getUserFromSession } from '@/lib/auth'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const user = await getUserFromSession()

  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  })
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
