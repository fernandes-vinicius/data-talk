import Link from 'next/link'

import { LoginButton } from '@/components/auth/login-button'
import { RegisterButton } from '@/components/auth/register-button'
import { Button } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'

export function Navbar() {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <Wrapper>
        <div className="flex h-14 items-center justify-between border-b border-gray-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>DataTalk.</span>
          </Link>

          {/* TODO: add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/pricing">Pricing</Link>
              </Button>

              <LoginButton />
              <RegisterButton />
            </>
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}
