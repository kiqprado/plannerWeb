import { Button } from '@/app/elements/button'

import { User, UserPlus, UserRoundPlus, ArrowRight } from 'lucide-react'

interface IInitialTripGuestsManager {
  HandleTripInvitesEmailsModal: () => void
  HandleToggleTripCreationModal: () => void
  emailsToInvite: string[]
}

export function InitialTripGuestsManager({
  HandleTripInvitesEmailsModal,
  HandleToggleTripCreationModal,
  emailsToInvite
}: IInitialTripGuestsManager) {
  return(
    <div className='w-[60%] flex gap-4 px-6 py-3.5 items-center justify-between rounded-xl bg-zinc-900 box-shadow'>
      <Button 
        onClick={HandleTripInvitesEmailsModal}
        scale='start'
        colors='tertiary'
      >
        {emailsToInvite.length > 0 ? (
          emailsToInvite.length === 1 ? (
            <span
              className='flex gap-2 items-center text-zinc-200'
            >
              <User className='size-5'/> 01 convidado(a)
            </span>
          ) : (
            <span
              className='flex gap-2 items-center text-zinc-200'
            >
              <UserPlus className='size-5'/> {emailsToInvite.length.toString().padStart(2, '0')} pessoas convidadas
            </span>
          )
                    
        ) : (
          <span className='flex gap-2 text-zinc-400'>
            <UserRoundPlus className='size-5 text-zinc-500'/>
            Quem estará na viagem?
          </span>   
        )}
      </Button>         
      <Button
        onClick={HandleToggleTripCreationModal}
      >
        Confirmar viagem
        <ArrowRight className='size-5'/>
      </Button>
    </div>
  )
}