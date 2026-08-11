import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-primary text-background hover:bg-primary/90 active:scale-[0.98]',
  secondary:
    'bg-transparent border border-primary/30 text-primary hover:border-primary active:scale-[0.98]',
  ghost: 'bg-transparent text-primary underline underline-offset-4 hover:text-accent',
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
