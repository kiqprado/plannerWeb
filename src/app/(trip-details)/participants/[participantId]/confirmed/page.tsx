'use client'

import { useParams, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../../../public/assets/Logo.svg'

export default function ConfirmParticipantPage() {
  const { participantId } = useParams()
  const searchParams = useSearchParams()
  const tripId = searchParams.get('tripId')
  
  return (
    <div className="h-svh flex relative bg-[url('/bg.png')] bg-center bg-cover bg-no-repeat">
      <div className='m-auto flex flex-col items-center text-center '>
        <Image
          src={Logo}
          alt='Logo App Image'
          width={186}
          height={186}
          className='absolute top-12'
        />
        <h3 className='text-3xl text-zinc-100'>✅ Confirmação concluída.</h3>
        <div className='flex flex-col gap-3 absolute top-[60%]'>
          <span className='text-sm text-zinc-400 tracking-wide'>Sua presença na viagem foi confirmada com sucesso!</span>
          <span className='text-sm text-zinc-400 tracking-wide'>Confira os detalhes para não perder nada.</span>
          {tripId && participantId ? (
            <Link 
              href={`/trips/${tripId}?participantId=${participantId}`}
              target='_blank'
              className='mt-3'
            >
              Ver minha viagem 
            </Link>
          ) : (
            <span>Carregando detalhes...</span>
          )}
          <span className='text-sm text-zinc-400 tracking-wide mt-9'>Obrigado por participar desta aventura 🚀</span>
        </div>

        <span className='absolute bottom-3 text-sm text-zinc-500'>Equipe <strong className='text-zinc-400 hover:text-zinc-200 transition-colors duration-300 ease-in-out'>Plann.Er</strong></span>
      </div>
    </div>
  )
}