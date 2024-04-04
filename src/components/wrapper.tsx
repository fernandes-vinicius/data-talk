import { cn } from '@/lib/utils'

interface WrapperProps extends React.ComponentProps<'div'> {}

export function Wrapper({ className, ...props }: WrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        className,
      )}
      {...props}
    />
  )
}
