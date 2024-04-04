import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'

import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'

export function RegisterButton() {
  return (
    <Button asChild size="sm" className="gap-1.5">
      <RegisterLink>
        Get started <Icon icon="ArrowRight" />
      </RegisterLink>
    </Button>
  )
}
