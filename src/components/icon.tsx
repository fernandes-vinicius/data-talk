import React from 'react'

import { icons, type LucideIcon, LucideProps } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface IconProps extends LucideProps {
  icon: keyof typeof icons
}

const Icon = React.forwardRef<React.ElementRef<LucideIcon>, IconProps>(
  ({ icon, className, ...props }, ref) => {
    const Comp = icons[icon]

    if (!Comp) {
      console.error(`Icon ${icon} does not exist`)
      return null
    }

    return <Comp ref={ref} className={cn('size-5', className)} {...props} />
  },
)
Icon.displayName = 'Icon'

export { Icon }
