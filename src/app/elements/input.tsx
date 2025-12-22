import { ReactNode, ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

interface IInput extends ComponentProps<'input'>,
VariantProps<typeof InputVariants>,
VariantProps<typeof ContainerInputVariants> {
  icon?: ReactNode
}

const ContainerInputVariants = tv({
  base: 'flex gap-2 items-center',
  variants: {
    variant: {
      primary: 'bg-transparent',
      secondary: 'px-4 py-2 rounded-lg bg-zinc-950 box-shadow'
    },
    length: {
      full: 'w-full',
      stretch: 'flex-1',
      fit: 'w-fit'
    },
    position: {
      relative: 'relative'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

const InputVariants = tv({
  base: [
    'outline-none bg-transparent',
    'text-zinc-50 placeholder:text-zinc-400'
  ],
  variants: {
    index: {
      none: 'z-0',
      lvl1: 'z-10'
    },
    scale: {
      full: 'w-full',
      small: 'w-22'
    }
  },
  defaultVariants: {
    scale: 'full'
  }
})

export function Input({icon, variant, length, scale, ...props}: IInput) {
  return(
    <div 
      className={ContainerInputVariants({ variant, length })}
    >
      { icon && (
        <span>{icon}</span>
      )}
      <input
        {...props}  
        className={InputVariants({ scale })} 
      />
    </div>
  )
}