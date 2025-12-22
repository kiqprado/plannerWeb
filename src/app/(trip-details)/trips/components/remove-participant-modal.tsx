import { Button } from '@/app/elements/button'

import { Participant } from '../[tripId]/page'

interface IRemoveParticipantModal {
  HandleOwnerRemoveParticipantOnTripModal: () => void
  RemoveParticipantOnTrip: (participant: string) => void
  participant: Participant
}

export function RemoveParticipantModal({
  HandleOwnerRemoveParticipantOnTripModal,
  RemoveParticipantOnTrip,
  participant
}: IRemoveParticipantModal) {
  return (
    <div className='absolute inset-0 flex rounded-lg box-shadow bg-zinc-950/70'>
      <div className='m-auto z-10 flex flex-col gap-6 px-6 py-4 rounded-lg border border-zinc-500 bg-zinc-900 box-shadow'>
        <div className=''>
          <h3 className='text-lg text-center text-zinc-100'>Confirmação de exclusão</h3>
          {participant?.is_confirmed ? (
            <span className='text-sm text-zinc-400'>
              <strong className='text-zinc-300'>{participant.name ? participant.name : participant.email} </strong>
               já confirmou a sua presença na viagem, 
              <strong className='text-zinc-300'>deseja exclui-lo?</strong>
            </span>
          ):(
            <span className='text-sm text-zinc-400'>
              Este participante ainda não confirmou a sua presença, <strong className='text-zinc-300'>deseja exclui-lo?</strong>
            </span>
          )}
          
        </div>
        <div className='flex justify-around'>
          <Button 
            onClick={() => RemoveParticipantOnTrip(participant.id)}
            scale='wide'
            colors='primary'
          >
            Excluir
          </Button>
          <Button 
            onClick={HandleOwnerRemoveParticipantOnTripModal}
            scale='wide'
            colors='secondary'
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}