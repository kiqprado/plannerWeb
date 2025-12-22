import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Trip } from '../[tripId]/page'

import { Input } from '@/app/elements/input'
import { ButtonIcon } from '@/app/elements/button-icon'
import { Button } from '@/app/elements/button'

import {X, User, Mail } from 'lucide-react'

interface IParticipantSuggestedNewGuestModal {
  HandleToggleParticipantSuggestedNewGuestModal: () => void
  ParticipantSuggestedGuest: (e: React.FormEvent<HTMLFormElement>) => void
  trip: Trip
}

export function ParticipantSuggestedNewGuestModal({
  HandleToggleParticipantSuggestedNewGuestModal,
  ParticipantSuggestedGuest,
  trip,
}: IParticipantSuggestedNewGuestModal) {
  return (
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto w-[50%] flex flex-col px-6 py-4 gap-4 rounded-lg bg-zinc-900 box-shadow relative'>
        <ButtonIcon
          onClick={HandleToggleParticipantSuggestedNewGuestModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg text-zinc-100'>Sugerir convidado a viagem</h3>
          <p 
            className='text-zinc-400 text-sm'
          >
            Mais pessoas a convidar? Não se preocupe, aqui você pode sugerir um novo participante na viagem a 
            <strong className='text-zinc-300'> {trip.destination} </strong>
            nas datas de 
            <strong className='text-zinc-300'> {format(trip.starts_at, "dd' de 'LLLL", {locale: ptBR})} a {format(trip.ends_at, "dd' a 'LLLL", { locale: ptBR})}
            </strong>.
          </p>
          <span className='text-zinc-400 text-sm'>
            Basta preencher os dados abaixo e o criador da viagem será notificado
            :
          </span>
        </div>
        <form 
          onSubmit={ParticipantSuggestedGuest}
          className='flex flex-col gap-3'>
          <Input
            icon={<User className='size-5 text-zinc-400'/>}
            type="text"
            name='name'
            placeholder='Nome completo do convidado'
            variant='secondary'
            length='full'
          />
          <Input
            icon={<Mail className='size-5 text-zinc-400'/>}
            type="mail"
            name='email'
            placeholder='Email completo do convidado'
            variant='secondary'
            length='full'
          /> 
          <Button
            type='submit'
            scale='full'
          >
            Sugerir convidado
          </Button>
        </form>
      </div>
    </div>
  )
}