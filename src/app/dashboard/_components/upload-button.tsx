'use client'

import { useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { green } from 'tailwindcss/colors'

import { trpc } from '@/app/_trpc/client'
import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'

const UploadDropzone = () => {
  const router = useRouter()

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { startUpload } = useUploadThing('pdfUploader')

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 500,
  })

  function startSimulatedProgress() {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)

      const progressInterval = startSimulatedProgress()

      // handle file uploading
      const res = await startUpload(acceptedFiles)

      if (!res) {
        toast.error('Something went wrong', {
          description: 'Please try again later',
        })
        return
      }

      const [fileResponse] = res

      const key = fileResponse?.key

      if (!key) {
        toast.error('Something went wrong', {
          description: 'Please try again later',
        })
        return
      }

      clearInterval(progressInterval)
      setUploadProgress(100)

      startPolling({ key })
    },
    [startPolling, startUpload],
  )

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
    >
      <input {...getInputProps()} />
      <div className="flex h-full w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Icon icon="Cloud" className="mb-2 size-6 text-zinc-500" />
            <p className="mb-2 text-sm text-zinc-700">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
          </div>

          {acceptedFiles && acceptedFiles[0] && (
            <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline-[1px] outline-zinc-200">
              <div className="grid h-full place-items-center px-3 py-2">
                <Icon icon="File" className="size-4 text-blue-500" />
              </div>
              <div className="h-full truncate px-3 py-2 text-sm">
                {acceptedFiles[0].name}
              </div>
            </div>
          )}

          {isUploading && (
            <div className="mx-auto mt-4 w-full max-w-xs">
              <Progress
                indicatorColor={uploadProgress === 100 ? green[500] : ''}
                value={uploadProgress}
                className="h-1 w-full bg-zinc-200"
              />
              {uploadProgress === 100 ? (
                <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                  <Icon icon="Loader" className="size-3 animate-spin" />
                  Redirecting...
                </div>
              ) : null}
            </div>
          )}
        </label>
      </div>
    </div>
  )
}

export function UploadButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}
