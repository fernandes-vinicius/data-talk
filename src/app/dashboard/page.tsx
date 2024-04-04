import { redirect } from 'next/navigation'

import { getUserFromSession } from '@/lib/auth'

export default async function Dashboard() {
  const user = await getUserFromSession()

  if (!user || !user.id) {
    // redirect('/api/auth/login?post_login_redirect_url=/dashboard')
    redirect('/auth-callback?origin=dashboard')
  }

  return <main>Dashboard: {user?.given_name}</main>
}
