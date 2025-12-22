import { ButtonIcon } from '@/app/elements/button-icon'
import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'

import {X, Tag, Calendar, Clock } from 'lucide-react'

interface ICreateActivityModal {
  HandleToggleCreateActivityModal: () => void
  CreateActivity: (e: React.FormEvent<HTMLFormElement>) => void
}

export function CreateActivityModal({
  HandleToggleCreateActivityModal,
  CreateActivity
}: ICreateActivityModal) {
  return(
    <div className='absolute inset-0 bg-zinc-950/70 flex'>
      <div className='m-auto space-y-4 px-6 py-4 w-[40%] rounded-lg bg-zinc-900 box-shadow relative'>
        <ButtonIcon
          onClick={HandleToggleCreateActivityModal}
          variant='absolute'
        >
          <X className='size-5'/>
        </ButtonIcon>
        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-100 text-lg'>Cadastrar atividade</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
          <span className='text-zinc-400 text-sm'>Todos convidados podem visualizar as atividades.</span>
        </div>

        <form 
          onSubmit={CreateActivity}
          className='flex flex-col gap-3'
        >
          <Input 
            icon={<Tag className='size-5 text-zinc-400'/>}
            type="text"
            name='title'
            placeholder='Qual a atividade?'
            variant='secondary'
            length='full'
          />
          <div className='flex gap-3 relative'>
            <Input
              icon={<Calendar className='size-5 text-zinc-400'/>}
              type="date"
              name='date'
              placeholder='-- / -- / --'
              variant='secondary'
              length='stretch'
              index='lvl1'
            />
            <Input
              icon={<Clock className='size-5 text-zinc-400'/>}
              type="time"
              name='hour'
              placeholder='-- : --'
              variant='secondary'
              length='fit'
              scale='small'
              index='lvl1'
            />
          </div>   
          <Button
            type="submit"
            scale='full'
          >
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}