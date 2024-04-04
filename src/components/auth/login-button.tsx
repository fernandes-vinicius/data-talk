import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/server'

import { Button } from '@/components/ui/button'

export function LoginButton() {
  return (
    <Button asChild variant="ghost" size="sm">
      <LoginLink>Sign In</LoginLink>
    </Button>
  )
}
