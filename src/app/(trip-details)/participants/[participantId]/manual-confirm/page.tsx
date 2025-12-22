'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/app/lib/axios'

import { Trip, Participant } from '@/app/(trip-details)/trips/[tripId]/page'

import Image from 'next/image'
import Logo from '../../../../../../public/assets/Logo.svg'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'

import { User, Mail} from 'lucide-react'

export default function ParticipantManualConfirmPresence() {
  const { participantId } = useParams()
  const router = useRouter()
  const [ trip, setTrip ] = useState<Trip | null>(null)

  async function ParticipantConfirmPresence(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data =  new FormData(e.currentTarget)
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()

    const response = await api.patch(`/participants/${participantId}/confirm`, {
      name,
      email
    })

    if(response.data.ok) {
      router.push(`/participants/${participantId}/confirmed?tripId=${response.data.tripId}`)
    }
  }

  useEffect(() => {
    async function FetchParticipantData() {
      const response = await api.get<Participant>(`/participants/${participantId}`)
      setTrip(response.data.trip)
    }

    if(participantId) {
      FetchParticipantData()
    }
  }, [participantId])

  if(!trip) return

  return(
    <div className="h-svh flex bg-[url('/bg.png')] bg-no-repeat bg-center bg-cover bg-zinc-950 relative">
      <div className='m-auto max-w-[50%] flex flex-col items-center gap-3 rounded-lg px-6 py-3 bg-zinc-900 box-shadow'>
        <Image
          src={Logo}
          alt='Logo on App'
          className='absolute x-[50%] top-12'
        />
        <div className='flex flex-col gap-3'>
          <h3 className='text-2xl text-zinc-100 text-center tracking-wide'>Confirmar participação</h3>
          <p 
            className='text-zinc-400 text-sm'
          >
            Você foi convidado(a) para participar de uma viagem para 
            <strong className='text-zinc-300'> {trip.destination} </strong>
            nas datas de 
            <strong className='text-zinc-300'> {format(trip.starts_at, "dd' de 'LLLL", {locale: ptBR})} a {format(trip.ends_at, "dd' a 'LLLL", { locale: ptBR})}
            </strong>.
          </p>
          <span className='text-zinc-400 text-sm'>
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </span>
        </div>

        <form 
          onSubmit={ParticipantConfirmPresence}
          className='flex flex-col gap-3 w-full'
        >
          <Input
            icon={<User className='size-5 text-zinc-400'/>}
            type="text"
            name='name'
            placeholder='Seu nome completo'
            variant='secondary'
            length='full'
          />
          <Input
            icon={<Mail className='size-5 text-zinc-400'/>}
            type="mail"
            name='email'
            placeholder='Seu e-mail'
            variant='secondary'
            length='full'
          /> 
          <Button
            type='submit'
            scale='full'
          >
            Confirmar minha presença
          </Button>
        </form>
      </div>
    </div>
  )
}