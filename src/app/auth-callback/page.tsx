'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { trpc } from '@/app/_trpc/client'
import { Icon } from '@/components/icon'

export default function AuthCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const origin = searchParams.get('origin')

  const { data, status, error } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  })

  useEffect(() => {
    if (status === 'success' && data?.success) {
      // user is synced to db
      router.push(origin ? `/${origin}` : '/dashboard')
    } else if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/sign-in')
    }
  }, [data?.success, error?.data?.code, origin, router, status])

  return (
    <main className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Icon icon="Loader" className="h-8 animate-spin text-zinc-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </main>
  )
}
