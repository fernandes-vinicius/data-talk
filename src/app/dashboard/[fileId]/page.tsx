import { notFound, redirect } from 'next/navigation'

import { db } from '@/db'
import { getUserFromSession } from '@/lib/auth'

import { ChatWrapper } from './_components/chat-wrapper'
import { PDFRenderer } from './_components/pdf-renderer'

interface FilePageProps {
  params: {
    fileId?: string
  }
}

export default async function FilePage({ params }: FilePageProps) {
  const user = await getUserFromSession()

  if (!user || !user.id) {
    redirect(`/auth-callback?origin=dashboard/${params.fileId}`)
  }

  const file = await db.file.findFirst({
    where: {
      id: params.fileId,
    },
  })

  if (!file) {
    notFound()
  }

  return (
    <main className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PDFRenderer />
          </div>
        </div>

        <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </main>
  )
}
