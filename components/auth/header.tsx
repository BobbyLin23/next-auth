import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

interface HeaderProps {
  label: string
}

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 Auth</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
