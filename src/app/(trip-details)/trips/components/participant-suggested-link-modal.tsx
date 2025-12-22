import { ButtonIcon } from '@/app/elements/button-icon'
import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'

import { X, Tag, Link2, } from 'lucide-react'

interface IParticipantSuggestedLinkModal {
  HandleToggleParticipantSuggestedNewLinkModal: () => void
  ParticipantSuggestedLinks: (e: React.FormEvent<HTMLFormElement>) => void
}

export function ParticipantSuggestedLinkModal({
  HandleToggleParticipantSuggestedNewLinkModal,
  ParticipantSuggestedLinks
}: IParticipantSuggestedLinkModal ) {

  return (
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='w-[40%] m-auto px-6 py-4 flex flex-col gap-4 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleToggleParticipantSuggestedNewLinkModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div>
          <h3 className='text-zinc-300 text-lg'>Sugerir novo link</h3>
          <span className='text-zinc-400 text-sm text-justify'>A sugestão de um novo link está diretamente condicionada a aprovação do criador da viagem para aparecer na área de Links.</span>
        </div>
        <form
          onSubmit={ParticipantSuggestedLinks}
          className='flex flex-col gap-3'
        >
          <Input
            icon={<Tag className='size-5 text-zinc-400'/>}
            type="text"
            name='title'
            placeholder='Título do link'
            variant='secondary'
            length='full'
          />
          <Input
            icon={<Link2 className='size-5 text-zinc-400'/>}
            type="text"
            name='url'
            placeholder='URL'
            variant='secondary'
            length='full'
          />
          <Button
            type="submit"
            scale='full'
          >
            Enviar sugestão
          </Button>
        </form>
      </div>
    </div>
  )
}