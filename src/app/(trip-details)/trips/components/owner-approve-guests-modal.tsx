import { Participant } from '../[tripId]/page'

import { ButtonIcon } from '@/app/elements/button-icon'
import { Button } from '@/app/elements/button'

import { X, User, Mail } from "lucide-react"

export type suggestedParticipant = Omit<
  Participant, 'id' | 'trip_id' | 'is_owner' | 'is_confirmed' | 'trip'
>

interface IOwnerApproveGuestsModal {
  HandleToggleOwnerApproveNewGuestModal: () => void
  suggestedParticipants: suggestedParticipant[]
  onApprove: (participant: suggestedParticipant) => void
  onDelete: (email: string) => void
}

export function OwnerApproveGuestsModal({
  HandleToggleOwnerApproveNewGuestModal,
  suggestedParticipants,
  onApprove,
  onDelete
}: IOwnerApproveGuestsModal) {

  const verifyParticipant = suggestedParticipants ?? []

  return(
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto w-[50%] px-6 py-4 flex flex-col gap-3 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleToggleOwnerApproveNewGuestModal}
          variant='absolute'
        >
          <X/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-300 text-lg'>Sugestão de Convidado</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
          <span className='text-zinc-400 text-sm text-justify'>
            Você recebeu a sugestão de um novo convidado(a), adicione-o a viagem: 
          </span>
        </div>
        <div 
          className='overflow-hidden py-0.5 rounded-lg 
            box-shadow bg-zinc-950'
        >   
          <div 
            className='max-h-86 p-3 space-y-3 overflow-y-auto'
          >
            {verifyParticipant.length > 0 ? (
              verifyParticipant.map((participant, i) => (
                <div 
                  key={i} 
                  className='p-3 space-y-1.5
                    rounded-lg 
                    box-shadow bg-zinc-900'
                >
                  <div className='flex justify-between'>   
                    <span className='text-md tracking-wide'>
                      <strong>Zé polessa</strong> sugeriu:
                    </span>
                    <ButtonIcon
                      onClick={() => onDelete(participant.email)}
                      colors='secondary'
                      title='Excluir sugestão'
                    >
                      <X/>
                    </ButtonIcon>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div 
                      className=' flex items-center gap-3
                        rounded-lg px-4 py-2 box-shadow
                        text-zinc-400 bg-zinc-950'
                    >
                      <User className="size-5"/>
                      <span>{participant.name}</span>
                    </div>
                    <div 
                      className='flex items-center gap-3
                        rounded-lg px-4 py-2 box-shadow 
                        text-zinc-400 bg-zinc-950'
                    >
                      <Mail className="size-5 "/>
                      <span 
                        className='hover:text-cyan-500 transition-colors duration-300 ease-in-out cursor-grab'
                      >
                        {participant.email}
                      </span>
                    </div>
                    <Button 
                      onClick={() => onApprove(participant)}
                      scale='full'
                    >
                      Adicionar participante
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-zinc-300 text-center'>Nenhuma sugestão pendente</p>
            )}
          </div>
        </div> 
      </div>
    </div>
  )
}