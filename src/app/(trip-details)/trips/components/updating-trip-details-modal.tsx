import { Input } from '@/app/elements/input'
import { Button } from '@/app/elements/button'
import { ButtonIcon } from '@/app/elements/button-icon'

import { DateRange, DayPicker } from 'react-day-picker'

import { X, MapPin, Calendar } from 'lucide-react'

interface IUpdatingTripDetailsModal {
  UpdatingTripDetails: () => void
  HandleToggleUpdatingTripDetailsModal: () => void
  setNewDestinationTripName: (destination: string) => void
  HandleToggleDatePickerModal: () => void
  datePickerModal: boolean,
  newFormattedTripSelectedDates: string | null
  newStartsAndFinishesDate: DateRange | undefined
  setNewStartsAndFinishesDate: (dates: DateRange | undefined) => void
}

export function UpdatingTripDetailsModal({
  UpdatingTripDetails,
  HandleToggleUpdatingTripDetailsModal,
  setNewDestinationTripName,
  HandleToggleDatePickerModal,
  datePickerModal,
  newFormattedTripSelectedDates,
  newStartsAndFinishesDate,
  setNewStartsAndFinishesDate
} : IUpdatingTripDetailsModal) {
  return(
    <div className='absolute inset-0 flex bg-zinc-950/70'>
      <div className='m-auto w-[40%] px-6 py-4 flex flex-col gap-3 relative rounded-lg bg-zinc-900 box-shadow'>
        <ButtonIcon
          onClick={HandleToggleUpdatingTripDetailsModal}
          variant='absolute'
        >
          <X/>
        </ButtonIcon>

        <div className='flex flex-col gap-3'>
          <div>
            <h3 className='text-zinc-300 text-lg'>Altere os dados de sua viagem</h3>
            <div className='h-0.5 w-full bg-zinc-500 box-shadow rounded-lg'/>
          </div>
          <span className='text-zinc-400 text-sm text-justify'>
            Defina abaixo o <strong className='text-zinc-300'>Local</strong> e as novas <strong className='text-zinc-300'>datas</strong> para sua viagem: 
          </span>
        </div>

        <div className='flex flex-col gap-3'>
          <Input
            icon={<MapPin className='size-5 text-zinc-400'/>}
            type="text"
            name='destination'
            onChange={(e) => setNewDestinationTripName(e.target.value)}
            placeholder='Para onde você vai?'
            variant='secondary'
            length='full'
          />
          <Button
            scale='start'
            align='start'
            colors='quaternary'
            onClick={HandleToggleDatePickerModal}
          >
            <Calendar className='size-5 text-zinc-500'/>
          <span 
            className={ newFormattedTripSelectedDates ? 'text-zinc-100' : 'text-zinc-400'}
          >
            { newFormattedTripSelectedDates || 'Quando?' }
          </span>
          </Button>
           { datePickerModal && (
              <div className='absolute inset-0 bg-zinc-950/70 flex'>
                <div className='m-auto px-6 py-4 rounded-lg box-shadow bg-zinc-800 relative'>
                  <ButtonIcon
                    onClick={HandleToggleDatePickerModal}
                    variant='absolute'
                  >
                    <X className='size-5'/>
                  </ButtonIcon>
                  <h3 className='text-zinc-100 text-lg text-center'>Selecione a data</h3>
                  <DayPicker
                    mode='range'
                    selected={newStartsAndFinishesDate}
                    onSelect={setNewStartsAndFinishesDate}
                    className='text-sm'
                  />
                </div>
              </div>
            )}
          <Button
            onClick={UpdatingTripDetails}
            scale='full'
          >
            Alterar local e data
          </Button>
        </div>
      </div>
    </div>
  )
}