import { createUploadthing, type FileRouter } from 'uploadthing/next'
// import { UploadThingError } from 'uploadthing/server'

import { getUserFromSession } from '@/lib/auth'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

export const ourFileRouter = {
  pdfUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const user = await getUserFromSession()

      if (!user || !user.id) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {}
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
