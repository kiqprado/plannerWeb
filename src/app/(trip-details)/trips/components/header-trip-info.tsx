import { Trip } from '../[tripId]/page'
import { Participant } from '../[tripId]/page'

import { Button } from '@/app/elements/button'

import Image from 'next/image'
import Logo from '../../../../../public/assets/Logo.svg'

import { IslandIcon, AirplaneTakeoffIcon, WindmillIcon} from '@phosphor-icons/react/dist/ssr'
import { MapPin, Calendar, Settings2, RotateCcw } from 'lucide-react'

interface IHeaderTripInfo {
  trip: Trip | null
  participant: Participant | null
  formattedTripSelectedDates: string | null
  HandleToggleUpdatingTripDetailsModal: () => void
  HandleToggleResetTripDetailsModal: () => void
}

export function HeaderTripInfo({ 
  trip,
  participant,
  formattedTripSelectedDates,
  HandleToggleUpdatingTripDetailsModal,
  HandleToggleResetTripDetailsModal
}: IHeaderTripInfo) {
  return (
    <div className='w-full flex flex-col items-center gap-1  text-zinc-100 rounded-lg'>
      <div className='w-full flex items-center justify-between'>
        <Image
          src={Logo}
          alt='Logo App Image'
          width={152}
          className=''
        />
        <div className='flex items-center gap-3'>
          <AirplaneTakeoffIcon className='size-6' alt='Realize'/>
          <IslandIcon className='size-6 text-lime-400' alt='Aproveite'/>
          <WindmillIcon className='size-6' alt='Relaxe'/>
        </div>
      </div>

      <div 
        className='w-[98%] px-3 py-2 rounded-lg 
          flex items-center justify-between gap-6
          box-shadow bg-zinc-900'
      >
        <span className='flex flex-1 gap-3'><MapPin/> {trip?.destination}</span>
        <span className='flex gap-3'><Calendar/> {formattedTripSelectedDates}</span>
        {participant?.is_owner && (
          <div className='w-0.5 h-8 bg-zinc-500 rounded-xl'/>
        )}
        { participant?.is_owner && (
          <div className='flex gap-3'>
            <Button 
              onClick={HandleToggleUpdatingTripDetailsModal}
              colors='secondary'
              title='Altere dados iniciais de sua viagem.'
            >
              Alterar local/data
              <Settings2 className='size-5'/>
            </Button>
            <Button
              onClick={HandleToggleResetTripDetailsModal}
              colors='primary'
              title='Excluir a viagem.'
            >
              Resetar
              <RotateCcw className='size-5'/>
            </Button>
          </div>
        )} 
      </div>  
    </div>
  )
}