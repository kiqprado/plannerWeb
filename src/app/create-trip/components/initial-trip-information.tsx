import { DateRange, DayPicker } from 'react-day-picker'

import { Button } from '@/app/elements/button'
import { ButtonIcon } from '@/app/elements/button-icon'
import { Input } from '@/app/elements/input'

import { MapPin, Calendar, Settings2, ArrowRight, X } from 'lucide-react'

interface IInitialTripInfo {
  HandleToggleInitialTripDetailsModal: () => void
  HandleToggleDatePickerModal: () => void
  setDestinationTripName: (destination:string) => void
  initialTripDetailsModal: boolean
  formattedTripSelectedDates: string | null
  datePickerModal: boolean
  startsAndFinishesDate: DateRange | undefined
  setStartsAndFinishesDate: (dates: DateRange | undefined) => void
}

export function InitialTripInfo({
  HandleToggleInitialTripDetailsModal,
  HandleToggleDatePickerModal,
  setDestinationTripName,
  initialTripDetailsModal,
  formattedTripSelectedDates,
  datePickerModal,
  startsAndFinishesDate,
  setStartsAndFinishesDate
}: IInitialTripInfo ) {
  return(
    <div className='w-[60%] flex gap-4 px-6 py-3.5 items-center rounded-xl bg-zinc-900 box-shadow'>
      <Input 
        icon={<MapPin className='size-5 text-zinc-500'/>}
        type="text"
        name='destination'
        onChange={(e) => setDestinationTripName(e.target.value)}
        placeholder="Para onde você vai?"
        disabled={initialTripDetailsModal === true}
        length='stretch'
        scale='full'
      />
      <div className=''>
        <Button 
          onClick={HandleToggleDatePickerModal}
          disabled={initialTripDetailsModal === true}
          scale='fit'
          colors='tertiary'
        >
          <Calendar className='size-5 text-zinc-500'/>
          <span 
            className={ formattedTripSelectedDates ? 'text-zinc-100' : 'text-zinc-400'}
          >
            { formattedTripSelectedDates || 'Quando?' }
          </span>
        </Button>
        { datePickerModal && (
          <div className='absolute inset-0 bg-zinc-950/70 flex'>
            <div className='w-[26%] m-auto px-6 py-4 rounded-lg box-shadow bg-zinc-800 relative'>
              <ButtonIcon
                onClick={HandleToggleDatePickerModal}
                variant='absolute'
              >
                <X className='size-5'/>
              </ButtonIcon>
              <h3 className='text-zinc-100 text-lg text-center'>Selecione a data</h3>
              <DayPicker
                mode='range'
                selected={startsAndFinishesDate}
                onSelect={setStartsAndFinishesDate}
                className='text-sm'
              />
            </div>
          </div>
        )}
      </div>
            
      <div className='w-0.5 h-7 bg-zinc-700'/>

      { initialTripDetailsModal === true ? (
        <Button 
          onClick={HandleToggleInitialTripDetailsModal}
          colors='secondary'
        >
          Alterar local/data
          <Settings2 className='size-5'/>
        </Button>
      ):(
        <Button 
          onClick={HandleToggleInitialTripDetailsModal}
        >
          Continuar
          <ArrowRight className='size-5'/>
        </Button>
      )}
    </div>
  )
}