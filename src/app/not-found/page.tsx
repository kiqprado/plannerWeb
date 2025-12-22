import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/assets/Logo.svg'


export default function NotFoundPage(){
  return(
    <div className='h-svh flex relative'>
      <Image
        src={Logo}
        alt='Image Logo App'
        className='absolute top-15 left-1/2 -translate-x-1/2'
      />
      <div 
        className="h-[88%] w-full absolute top-1/2 -translate-y-1/2
          bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover"
      />

      <h2 
        className='text-4xl tracking-widest
          absolute top-52 left-1/2 -translate-x-1/2'
      >
        404
      </h2>
      <span 
        className='text-2xl tracking-wider
          absolute top-70 left-1/2 -translate-x-1/2'
      >
        Ops...
      </span>

      <span 
        className='w-full text-center tracking-wider
          absolute top-88 left-1/2 -translate-x-1/2'
      >
        No momento a página que você está tentando acessar parece indisponível ou inexistente.
      </span>
      
      <Link
        href={'/create-trip'}
        className='absolute bottom-39 left-1/2 -translate-x-1/2
          rounded-lg px-6 py-2 border border-lime-950
          text-lime-950 font-bold tracking-wider bg-lime-500 box-shadow
          hover:bg-lime-400 transition-colors duration-300 ease-in-out'
      >
        Página Inicial
      </Link>
    </div>
  )
}