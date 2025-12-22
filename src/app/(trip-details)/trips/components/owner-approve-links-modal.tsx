import { Participant } from '../[tripId]/page'
import { Links } from '../[tripId]/page'

import { ButtonIcon } from '@/app/elements/button-icon'
import { Button } from '@/app/elements/button'

import { X, Tag, Link2 } from 'lucide-react'
import Link from 'next/link'

type suggestedLink = Omit<Links, 'id'>

interface IOwnerApproveLinksModal {
  HandleToggleOwnerApproveANewLinkSuggestedModal: () => void
  suggestedLinks: suggestedLink[]
  onApprove: (link: suggestedLink) => void
  onDelete: (link: string) => void
  participant: Participant
}

export function OwnerApproveLinksModal({
  HandleToggleOwnerApproveANewLinkSuggestedModal,
  suggestedLinks,
  onApprove,
  onDelete,
  participant
}: IOwnerApproveLinksModal) {

  const safeLinks = suggestedLinks ?? []

  return(
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto w-[40%] px-6 py-4 flex flex-col gap-3 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleToggleOwnerApproveANewLinkSuggestedModal}
          variant='absolute'
        >
          <X/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-300 text-lg'>Sugestões de Links dos participantes</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
          <span className='text-zinc-400 text-sm text-justify'>
            Você recebeu a sugestão de um novo link, adicione-o ao cronograma da viagem: 
          </span>
        </div>
        <div 
          className='overflow-hidden py-0.5 rounded-lg 
            box-shadow bg-zinc-950'
        >   
          <div 
            className='max-h-86 p-3 space-y-3 overflow-y-auto'
          >
            {safeLinks.length > 0 ? (
              safeLinks.map((link, i) => (
                <div 
                  key={i} 
                  className='p-3 space-y-1.5
                    rounded-lg 
                    box-shadow bg-zinc-900'
                >
                  <div className='flex justify-between'>   
                    <span className='text-md tracking-wide'>
                      <strong>{participant.name}</strong> sugeriu:
                    </span>
                    <ButtonIcon
                      onClick={() => onDelete(link.url)}
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
                      <Tag className="size-5"/>
                      <span>{link.title}</span>
                    </div>
                    <div
                      className='flex items-center gap-3 rounded-lg px-4 py-2 
                        box-shadow bg-zinc-950 text-zinc-400 hover:'
                    >
                      <Link2 className='size-5'/>
                      <Link
                        href={link.url}
                        target='_blank'
                        className='max-w-76 truncate overflow-hidden
                          hover:text-cyan-500 transition-colors duration-300 ease-in-out'
                      >
                        {link.url}
                      </Link>
                    </div>
                    <Button 
                      onClick={() => onApprove(link)}
                      scale='full'
                    >
                      Incluir Link
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