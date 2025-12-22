import { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

interface IButton extends ComponentProps<'button'>,
VariantProps<typeof ButtonVariants> {
  children: ReactNode
}

const ButtonVariants = tv({
  base: [
    'flex items-center gap-2 px-3 py-1.5 rounded-lg outline-none',
    'transition-all duration-300 ease-in-out',
  ],
  variants: {
    scale: {
      full: 'w-full',
      fit: 'w-fit min-w-36',
      start: 'px-0',
      wide: 'min-w-[32%] px-6 tracking-wider'
    },
    align: {
      center: 'justify-center',
      start: 'justify-start px-4'
    },
    colors: {
      primary: 'bg-lime-500 font-bold text-lime-950 hover:bg-lime-400 box-shadow',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-zinc-100 box-shadow',
      tertiary: 'bg-transparent',
      quaternary: 'bg-zinc-950 box-shadow'
    }
  },
  defaultVariants: {
    colors: 'primary',
    align: 'center'
  }
})

export function Button({children, align, colors, scale, ...props}: IButton) {
  return(
    <button
      {...props}
      className={ButtonVariants({ align, colors, scale })}
    >
      {children}
    </button>
  )
}