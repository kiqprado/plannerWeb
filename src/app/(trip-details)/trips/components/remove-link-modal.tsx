import { Links } from "../[tripId]/page"

import { Button } from "@/app/elements/button"

interface IRemoveLinkModal {
  HandleOwnerRemoveLinkOnTripModal: () => void
  RemoveLinkOnTrip: (link: string) => void
  link: Links
}

export function RemoveLinkModal({
  HandleOwnerRemoveLinkOnTripModal,
  RemoveLinkOnTrip,
  link
}: IRemoveLinkModal) {
  return(
    <div className='absolute inset-0 flex rounded-lg box-shadow bg-zinc-950/70'>
      <div className='m-auto z-10 flex flex-col gap-6 px-6 py-4 rounded-lg border border-zinc-500 bg-zinc-900 box-shadow'>
        <div className=''>
          <h3 className='text-lg text-center text-zinc-100'>Confirmação de exclusão</h3>
          <span className='text-sm text-zinc-400'>
            Você esta prestes a excluir o link com o título: 
            <strong
              title={link.url} 
              className='text-zinc-300' 
            > {link.title} </strong>
            deseja realmente exclui-lo?
          </span>     
        </div>

        <div className='flex justify-around'>
          <Button 
            onClick={() => RemoveLinkOnTrip(link.id)}
            scale='wide'
            colors='primary'
          >
            Excluir
          </Button>
          <Button 
            onClick={HandleOwnerRemoveLinkOnTripModal}
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