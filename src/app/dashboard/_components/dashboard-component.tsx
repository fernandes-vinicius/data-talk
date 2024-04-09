'use client'

import { useState } from 'react'

import { format } from 'date-fns'
import Link from 'next/link'

import { trpc } from '@/app/_trpc/client'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { UploadButton } from './upload-button'

export function DashboardComponent() {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState('')

  const utils = trpc.useUtils()

  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id)
    },
    onSettled: () => {
      setCurrentlyDeletingFile('')
    },
  })

  const sortedFiles = files?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">My Files</h1>
        <UploadButton />
      </div>

      {/* display all user files */}
      {sortedFiles && sortedFiles.length === 0 && !isLoading && (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Icon icon="Ghost" className="size-8 text-zinc-800" />
          <h3 className="text-xl font-semibold">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}

      {sortedFiles && sortedFiles.length === 0 && isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      )}

      {sortedFiles && sortedFiles.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {sortedFiles.map((file) => (
            <li
              key={file.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <Link
                href={`/dashboard/${file.id}`}
                className="flex flex-col gap-2"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="size-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium text-zinc-900">
                        {file.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Icon icon="Plus" className="size-4" />
                  {format(new Date(file.createdAt), 'MMM yyyy')}
                </div>

                <div className="flex items-center gap-2">
                  <Icon icon="MessageSquare" className="size-4" />
                  mocked
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full"
                  disabled={currentlyDeletingFile === file.id}
                  onClick={() => deleteFile({ id: file.id })}
                >
                  {currentlyDeletingFile === file.id && (
                    <Icon icon="Loader" className="size-4 animate-spin" />
                  )}
                  {currentlyDeletingFile !== file.id && (
                    <Icon icon="Trash" className="size-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
