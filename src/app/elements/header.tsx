import Image from 'next/image'
import Logo from '../../../public/assets/Logo.svg'

export function Header() {
  return(
    <div className="flex flex-col gap-8 items-center">
      <Image
        src={Logo}
        alt="Logo App"
        width={212}
        height={136}
      />
      <span className='text-zinc-300'>Convide seus amigos e planeje sua próxima viagem!</span>
    </div>
  )
}