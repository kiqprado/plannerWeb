import { format, parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'

import { Activity, DaysOnTrip } from '../[tripId]/page'

import { ButtonIcon } from '@/app/elements/button-icon'

import { CircleCheck, CircleDashed, X } from 'lucide-react'

interface ITripDay {
  day: DaysOnTrip
  HandleCheckPointsActivityStatus: () => void
  HandleToggleOwnerRemoveActivityModal: (activity: Activity) => void
  activityCheckPointStatus: boolean
  participantIsOwnerOnTrip: boolean
}

export function TripDay({
  day,
  HandleCheckPointsActivityStatus,
  HandleToggleOwnerRemoveActivityModal,
  activityCheckPointStatus,
  participantIsOwnerOnTrip
}:ITripDay ) {
  return (
    <div
      key={day.date}
      className='space-y-3'
    >
      <div className='flex items-baseline gap-3'>
        <h3 className='text-xl font-semibold text-zinc-200'>{`Dia ${format(day.date, "dd")}`}</h3>
        <span className='text-sm text-zinc-300 tracking-wide'>{format(day.date, "eeee", { locale: ptBR})}</span>
      </div>
      {day.activities.length > 0 ? (
        <ul className='space-y-3 group'>
          {day.activities.map(activity => (
            <li 
              key={activity.id}
              className={`w-full flex items-center gap-3 
                ${participantIsOwnerOnTrip ? 'pl-4' : 'px-4'} py-2 
                rounded-lg bg-zinc-900 box-shadow`}
            >
              <ButtonIcon 
                onClick={HandleCheckPointsActivityStatus}
              >
                {activityCheckPointStatus 
                  ? <CircleCheck className='size-5 text-lime-300'/> 
                  : <CircleDashed className='size-5 text-zinc-300'/>
                }
              </ButtonIcon>
              <h3 className='text-lg text-zinc-100 tracking-wide'>{activity.title}</h3>
              <span 
                className='text-sm ml-auto text-zinc-300'>
                    {formatInTimeZone(parseISO(activity.occurs_at), 'America/Sao_Paulo', 'HH:mm')}h
              </span>
              { participantIsOwnerOnTrip && (
                <button
                  onClick={() => HandleToggleOwnerRemoveActivityModal(activity)}
                  title="Excluir esta atividade?"
                  className="w-0 opacity-0 scale-0 overflow-hidden
                    group-hover:w-8 group-hover:opacity-100 group-hover:scale-100
                    group-hover:text-red-500 group-hover:brightness-125
                    transition-all duration-500 ease-in-out"
                >
                  <X className='self-center'/>
                </button>
              )}   
            </li>
          ))}
        </ul>
      ) : (
        <li className='list-none'><span className='text-zinc-400'>Nenhuma atividade cadastrada.</span></li>
      )}
    </div>
  )
}