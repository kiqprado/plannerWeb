import { type DateRange} from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'
import { ButtonIcon } from '@/app/elements/button-icon'

import { User, X, Mail} from 'lucide-react'

interface ITripCreationModal {
  CreateTrip: (e: React.FormEvent<HTMLFormElement>) => void
  HandleToggleTripCreationModal: () => void
  setOwnerTripName: (name: string) => void
  setOwnerTripEmail: (email: string) => void
  destinationTripName: string
  startsAndFinishesDate: DateRange | undefined
}

export function TripCreationModal({
  CreateTrip,
  HandleToggleTripCreationModal,
  setOwnerTripName,
  setOwnerTripEmail,
  destinationTripName,
  startsAndFinishesDate
}: ITripCreationModal ) {

  const formattedDateType = 
  startsAndFinishesDate?.from && startsAndFinishesDate?.to ?
    format(startsAndFinishesDate.from, "d", { locale: ptBR})
    .concat(" até ")
    .concat(format(startsAndFinishesDate.to, "d' de 'LLLL", {locale: ptBR})) 
  : null

  return (
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto max-w-[50%] px-6 py-5 flex flex-col gap-4 rounded-md bg-zinc-800 relative'>
        <ButtonIcon
          onClick={HandleToggleTripCreationModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div>
          <h3 className='text-zinc-50 text-xl'>Confirmar criação da viagem</h3>
          <span
            className='text-zinc-400 text-sm'
          >
            Para concluir a criação da viagem para <strong className='text-zinc-200 hover:text-zinc-100 transition-colors duration-200 ease-in-out'>{destinationTripName}</strong> nas datas de <strong className='text-zinc-200 hover:text-zinc-100 transition-colors duration-200 ease-in-out'>{formattedDateType}</strong> preencha seus dados abaixo:
          </span>
        </div>
            
        <form 
          onSubmit={CreateTrip}
          className='flex flex-col items-center gap-3'
        >
          <Input
            icon={<User className="size-5 text-zinc-400"/>}
            type="text"
            name="name"
            onChange={e => setOwnerTripName(e.target.value)}
            placeholder="Seu nome completo"
            variant='secondary'
            length='full'
          />
          <Input
            icon={<Mail className="size-5 text-zinc-400"/>}
            type="email"
            name="email"
            onChange={e => setOwnerTripEmail(e.target.value)}
            placeholder="Seu e-mail pessoal"
            variant='secondary'
            length='full'
          />
          <Button
            type="submit"
            scale='full'
          >
            Confirmar criação da viagem
          </Button>  
        </form>
      </div>
    </div>
  )
}