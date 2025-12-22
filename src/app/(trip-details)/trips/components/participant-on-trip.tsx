import { Participant } from "../[tripId]/page"

import { CircleCheck, CircleDashed, X } from 'lucide-react'

interface IParticipantOnTrip {
  HandleOwnerRemoveParticipantOnTripModal: () => void
  participantIsOwnerOnTrip: boolean
  participant: Participant
  index: number
}

export function ParticipantOnTrip({
  HandleOwnerRemoveParticipantOnTripModal,
  participantIsOwnerOnTrip,
  participant,
  index
}: IParticipantOnTrip) {
  return(
    <div>
      {participantIsOwnerOnTrip ? (
        <div 
          key={participant.email}
          className='w-full flex items-center justify-between group'
        >
          <div className='flex flex-col items-start'>
            <span 
              className='text-zinc-100 text-lg'
            >
              {participant.name ? participant.name : `Convidado ${(index + 1).toString().padStart(2, '0')}`}
            </span>
            <span className='text-zinc-400'>{participant.email}</span>
          </div>
          <div
            className='flex items-center gap-3'
          >
            {participant.is_confirmed 
              ? <CircleCheck className='ml-auto text-lime-300'/>
              : <CircleDashed className='ml-auto text-zinc-300'/>
            }
            <button
              onClick={HandleOwnerRemoveParticipantOnTripModal}
              title="Excluir convidado?"
              className="w-0 opacity-0 scale-0 overflow-hidden
                group-hover:w-8 group-hover:opacity-100 group-hover:scale-100
                group-hover:text-red-500 group-hover:brightness-125
                transition-all duration-500 ease-in-out"
            >
              <X className=''/>
            </button>
          </div> 
        </div>
      ): (
        <div 
          key={participant.email}
          className='flex items-center'
        >
          <div className='flex flex-col'>
            <span 
              className='text-zinc-100 text-lg'
            >
              {participant.name ? participant.name : `Convidado ${(index + 1).toString().padStart(2, '0')}`}
            </span>
            <span className='text-zinc-400'>{participant.email}</span>
          </div>
          {participant.is_confirmed 
            ? <CircleCheck className='ml-auto text-lime-300'/>
            : <CircleDashed className='ml-auto text-zinc-300'/>
          }
        </div>
      )}
    </div>
  )
}