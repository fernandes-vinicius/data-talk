import Link from 'next/link'

import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'

import { BgBlur } from './_components/bg-blur'
import { PreviewImage } from './_components/preview-image'
import { Steps } from './_components/steps'

export default function Home() {
  return (
    <main>
      <Wrapper>
        <div className="flex flex-col items-center justify-center pb-12 pt-28 text-center sm:pt-40">
          {/* badge */}
          <div className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              DataTalk is now public!
            </p>
          </div>

          <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
            Chat with your <span className="text-blue-600">documents</span> in
            seconds.
          </h1>

          <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
            DataTalk allows your to have conversations with any PDF document.
            Simply upload your file and start asking questions right away.
          </p>

          <Button asChild size="lg" className="mt-5">
            <Link href="/dashboard" target="_blank" rel="noreferrer">
              Get started <Icon icon="ArrowRight" />
            </Link>
          </Button>
        </div>
      </Wrapper>

      {/* Value proposition section */}
      <section>
        <div className="relative isolate">
          <BgBlur />
          <PreviewImage src="/dashboard-preview.jpg" alt="product preview" />
          <BgBlur className="left-[calc(50%-13rem)] sm:left-[calc(50%-36rem)]" />
        </div>
      </section>

      {/* Feature section */}
      <section className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">
              Starting chatting in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chatting to your PDF files has never easier than with DataTalk.
            </p>
          </div>
        </div>

        <Steps />

        <PreviewImage
          src="/file-upload-preview.jpg"
          alt="uploading preview"
          width={1419}
          height={732}
        />
      </section>
    </main>
  )
}
