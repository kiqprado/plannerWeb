import { Button } from '../../../elements/button'

interface IResetTrpDetailsModal {
  ResetTripDetails: () => void
  HandleToggleResetTripDetailsModal: () => void
}

export function ResetTripDetailsModal({
  ResetTripDetails,
  HandleToggleResetTripDetailsModal}: IResetTrpDetailsModal) {
  return(
    <div
      className='absolute inset-0 flex bg-zinc-950/80'
    >
      <div className='m-auto w-[30%] flex flex-col px-6 py-4 gap-6 rounded-lg bg-zinc-900 box-shadow'>
        <div className='flex flex-col gap-2 items-center'>
          <h3 className='text-zinc-100 text-lg'>Deseja Sair da viagem atual?</h3>
          <span className='text-zinc-400 text-sm'>Ao clicar em <strong className='text-zinc-300'>sair</strong>, os dados da viagem serão <strong className='text-zinc-300'>resetados</strong>.</span>
        </div>
        <div className='flex justify-around'>
          <Button 
            onClick={ResetTripDetails}
            scale='wide'
            colors='primary'
          >
            Sair
          </Button>
          <Button 
            onClick={HandleToggleResetTripDetailsModal}
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