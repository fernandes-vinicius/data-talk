import { redirect } from 'next/navigation'

import { db } from '@/db'
import { getUserFromSession } from '@/lib/auth'

// '/api/auth/login?post_login_redirect_url=/dashboard'
const redirectUrl = '/auth-callback?origin=dashboard'

export default async function Dashboard() {
  const user = await getUserFromSession()

  if (!user || !user.id) {
    redirect(redirectUrl)
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    redirect(redirectUrl)
  }

  return <main>Dashboard: {user?.given_name}</main>
}
