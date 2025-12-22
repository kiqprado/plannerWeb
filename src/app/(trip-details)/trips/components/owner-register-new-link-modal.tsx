import { ButtonIcon } from '@/app/elements/button-icon'
import { Button } from '@/app/elements/button'
import { Input } from '@/app/elements/input'

import { X, Tag, Link2, } from 'lucide-react'

interface IRegisterNewLinkModal {
  HandleToggleCreateNewLinkModal: () => void
  CreateLink: (e: React.FormEvent<HTMLFormElement>) => void
}

export function RegisterNewLinkModal({
  HandleToggleCreateNewLinkModal,
  CreateLink
}:IRegisterNewLinkModal ) {
  return (
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto min-w-[40%] px-6 py-4 flex flex-col gap-4 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleToggleCreateNewLinkModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-300 text-lg'>Cadastrar link</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
         
          <span className='text-zinc-400 text-sm'>Todos convidados podem visualizar os links importantes.</span>
        </div>
        <form
          onSubmit={CreateLink}
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
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}