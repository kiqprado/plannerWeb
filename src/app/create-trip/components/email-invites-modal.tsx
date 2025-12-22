import { Button } from '@/app/elements/button'
import { ButtonIcon } from '@/app/elements/button-icon'
import { Input } from '@/app/elements/input'

import { X, AtSign, Plus } from 'lucide-react'

interface IEmailInvitesModal {
  HandleTripInvitesEmailsModal: () => void
  HandleRemoveEmailFromInvites: (email: string) => void
  HandleAddNewEmailToInvite: (e: React.FormEvent<HTMLFormElement>) => void
  emailsToInvite: string[]
}

export function EmailInvitesModal({
  HandleTripInvitesEmailsModal,
  HandleRemoveEmailFromInvites,
  HandleAddNewEmailToInvite,
  emailsToInvite
}: IEmailInvitesModal) {
  return (
    <div className="absolute inset-0 flex bg-zinc-950/70">
      <div className="m-auto max-w-[50%] px-6 py-5 space-y-4 rounded-md bg-zinc-800 relative box-shadow">
        <ButtonIcon 
          onClick={HandleTripInvitesEmailsModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-50 text-xl'>Selecionar convidados</h3>
            <div className='w-full h-0.5 bg-zinc-500 box-shadow rounded-xl'/>
          </div>
          <span className='text-zinc-400 text-sm'>
            Os convidados irão receber <strong className='text-zinc-300'>e-mails</strong> para confirmar a participação na viagem.
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          { emailsToInvite.length > 0 ? (
            emailsToInvite.map((email, index) => (
              <div
                key={index}
                className="flex gap-2 items-center px-2.5 py-1.5 rounded-md 
                  text-zinc-300 bg-zinc-700 box-shadow"
              >
                <span>{email}</span>
                <ButtonIcon onClick={() => HandleRemoveEmailFromInvites(email)}>
                  <X className='size-4'/>
                </ButtonIcon>
              </div>
            ))
          ): (
            <span className='w-full text-center font-bold text-zinc-400 my-12'>Adicione seus Companheiros de viagem</span> 
          )}
        </div>
        <div className='w-full h-0.5 bg-zinc-500 box-shadow rounded-xl'/>
        <form 
          onSubmit={HandleAddNewEmailToInvite}
          className='flex items-center px-4 py-2.5 gap-3 rounded-lg bg-zinc-950 box-shadow'
        >
          <Input 
            icon={<AtSign className="size-5 text-zinc-400"/>}
            type="email"
            name="email"
            placeholder="Digite o E-mail do convidado" 
            className='flex gap-2.5 items-center flex-1'
            length='stretch' 
          />
          <Button type="submit">
            Convidar
            <Plus className="size-5"/>
          </Button>
        </form>
      </div>
    </div>
  )
}