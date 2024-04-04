'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { trpc } from '@/app/_trpc/client'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const origin = searchParams.get('origin')

  const { data, status } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (status === 'success' && data?.success) {
      // user is synced to db
      router.push(origin ? `/${origin}` : '/dashboard')
    } else if (status === 'error') {
      router.push('/sign-in')
    }
  }, [data?.success, origin, router, status])

  return <main>AUthCallback</main>
}
