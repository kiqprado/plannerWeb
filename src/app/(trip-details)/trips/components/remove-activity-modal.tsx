import { Activity } from "../[tripId]/page"

import { Button } from "@/app/elements/button"

interface IRemoveActivityModal {
  HandleToggleOwnerRemoveActivityModal: () => void
  DeleteActivity: (activity: string) => void
  activity: Activity
}

export function RemoveActivityModal({
  HandleToggleOwnerRemoveActivityModal,
  activity,
  DeleteActivity
}: IRemoveActivityModal) {
  return(
    <div className='absolute inset-0 flex rounded-lg box-shadow bg-zinc-950/70'>
      <div className='m-auto z-10 flex flex-col gap-6 px-6 py-4 rounded-lg border border-zinc-500 bg-zinc-900 box-shadow'>
        <div className=''>
          <h3 className='text-lg text-center text-zinc-100'>Confirmação de exclusão</h3>
          <span className='text-sm text-zinc-400'>
            Deseja realmente excluir de seu cronograma a atividade 
            <strong
              title={activity?.title} 
              className='text-zinc-300' 
            > {activity?.title} </strong>
              ?
          </span>     
        </div>
    
        <div className='flex justify-around'>
          <Button
            onClick={() => DeleteActivity(activity.id)} 
            scale='wide'
            colors='primary'
          >
            Excluir
          </Button>
          <Button 
            onClick={HandleToggleOwnerRemoveActivityModal}
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