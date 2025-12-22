import { ReactNode, ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

interface IButtonIcon extends ComponentProps<'button'>,
VariantProps<typeof ButtonIconVariants> {
  children: ReactNode
}

const ButtonIconVariants = tv({
  base: [
    'hover:scale-110 transition-all duration-300 ease-in-out'
  ],
  variants: {
    variant: {
      absolute: 'absolute top-4 right-4',
      flex: '',
      right: 'ml-auto'
    },
    scale: {
    },
    colors: {
      primary: 'text-zinc-400 hover:text-zinc-200',
      secondary: 'text-red-600 hover:text-red-500'
    }
  },
  defaultVariants: {
    colors: 'primary'
  }
})

export function ButtonIcon({children, variant, colors, ...props}: IButtonIcon) {
  return(
    <button
      {...props}
      className={ButtonIconVariants({ variant, colors })}
    >
      {children}
    </button>
  )
}