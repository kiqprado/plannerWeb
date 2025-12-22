import { ButtonIcon } from '@/app/elements/button-icon'
import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'

import { X, UserRoundPlus, Mail, } from 'lucide-react'

interface IOwnerAddNewParticipantModal {
  HandleOwnerCreateNewAParticipantModal: () => void
  CreateNewParticipant: (e: React.FormEvent<HTMLFormElement>) => void
}

export function OwnerAddNewParticipantModal({
  HandleOwnerCreateNewAParticipantModal,
  CreateNewParticipant
}: IOwnerAddNewParticipantModal ) {
  return (
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='w-[40%] m-auto px-6 py-4 flex flex-col gap-4 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleOwnerCreateNewAParticipantModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-300 text-lg'>Adicionar um novo convidado</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
          <span 
            className='text-zinc-400 text-sm text-justify'
          >
            Insira os dados abaixo para realizar a adição de um novo convidado.
          </span>
        </div>
        <form
          onSubmit={CreateNewParticipant}
          className='flex flex-col gap-3'
        >
          <Input
            icon={<UserRoundPlus className='size-5 text-zinc-400'/>}
            type='text'
            name='name'
            placeholder='Nome completo do convidado'
            variant='secondary'
            length='full'
          />
          <Input
            icon={<Mail className='size-5 text-zinc-400'/>}
            type='text'
            name='email'
            placeholder='Email'
            variant='secondary'
            length='full'
          />
          <Button
            type="submit"
            scale='full'
          >
            Adicionar convidado
          </Button>
        </form>
      </div>
    </div>
  )
}