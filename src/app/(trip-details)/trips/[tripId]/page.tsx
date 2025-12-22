'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams, useSearchParams} from 'next/navigation'
import { api } from '@/app/lib/axios'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useCheckSplash } from '@/app/contexts/check-splash-context'

import { HeaderTripInfo } from '../components/header-trip-info'

import { TripDay } from '../components/trip-day'
import { LinksOnTrip } from '../components/links-on-trip'
import { ParticipantOnTrip } from '../components/participant-on-trip'

import { ResetTripDetailsModal } from '../components/reset-trip-details-modal'
import { UpdatingTripDetailsModal } from '../components/updating-trip-details-modal'
import { CreateActivityModal } from '../components/create-activity-modal'
import { RemoveActivityModal } from '../components/remove-activity-modal'
import { RegisterNewLinkModal } from '../components/owner-register-new-link-modal'
import { RemoveLinkModal } from '../components/remove-link-modal'
import { OwnerAddNewParticipantModal } from '../components/owner-add-new-participant'
import { OwnerApproveLinksModal } from '../components/owner-approve-links-modal'
import { OwnerApproveGuestsModal } from '../components/owner-approve-guests-modal'
import { RemoveParticipantModal } from '../components/remove-participant-modal'
import { ParticipantSuggestedLinkModal } from '../components/participant-suggested-link-modal'
import { ParticipantSuggestedNewGuestModal } from '../components/participant-suggested-guest-modal'

import { type suggestedParticipant } from '../components/owner-approve-guests-modal'

import { Button } from '@/app/elements/button'

import { Plus, UserPlus, UserCog } from 'lucide-react'
import { DateRange } from 'react-day-picker'

export interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
  participants: Participant[]
  activities: Activity[]
  links: string[]
}

export interface Participant {
  id: string
  trip_id: string
  name: string | null
  email: string
  is_owner: boolean
  is_confirmed: boolean
  trip: Trip
}

export interface DaysOnTrip {
  date: string
  activities: Activity[]
}

export interface Activity {
  id: string
  title: string
  occurs_at: string
}

export interface Links {
  id: string
  title: string
  url: string
}

export default function TripDetailsPage() {
  const { tripId } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const participantId = searchParams.get('participantId')

  const { showCheckSplash } = useCheckSplash()

  const [ trip, setTrip ] = useState<Trip | null>(null)
  const [ daysOnTrip, setDaysOnTrip ] = useState<DaysOnTrip[]>([])

  const [ resetTripDetailsModal, setResetTripDetailsModal ] = useState(false)

  const [ updatingTripDetailsModal, setUpdatingTripDetailsModal ] = useState(false)
  const [ newDestinationTripName, setNewDestinationTripName ] = useState('')
  const [ datePickerModal, setDatePickerModal ] = useState(false)
  const [ newStartsAndFinishesDate, setNewStartsAndFinishesDate ] = useState<DateRange | undefined>()

  const [ participants, setParticipants ] = useState<Participant[]>([])
  const [ participant, setParticipant ] = useState<Participant| null>(null)

  const [ suggestedParticipants, setSuggestedParticipants ] = useState<Participant[]>([])
  const [ participantSuggestedNewGuestModal, setParticipantSuggestedNewGuestModal ] = useState(false)

  const [ ownerApproveNewGuestModal, setOwnerApproveNewGuestModal ] = useState(false)
  const [ tripOwnerAddParticipantOnTrip, setTripOwnerAddParticipantOnTrip ] = useState(false)
  const [ selectedParticipantToRemove, setSelectedParticipantToRemove ] = useState<Participant | null>(null) 
  const [ tripOwnerConfirmRemoveParticipantModal, setTripOwnerConfirmRemoveParticipantModal ] = useState(false)

  const [ linksOnTrip, setLinksOnTrip ] = useState<Links[]>([])
  const [ suggestedLinks, setSuggestedLinks ] = useState<Links[]>([])
  const [ createNewLinkModal, setCreateNewLinkModal ] = useState(false)
  const [ tripOwnerConfirmRemoveLinkModal, setTripOwnerConfirmRemoveLinkModal ] = useState(false)
  const [ selectedLinkToRemove, setSelectedLinkToRemove ] = useState<Links | null>(null) 

  const [ participantSuggestedNewLinkModal, setParticipantSuggestedNewLinkModal ] = useState(false)
  const [ ownerApproveNewLinkModal, setOwnerApproveNewLinkModal ] = useState(false)

  const [ createActivityModal, setCreateActivityModal ] = useState(false)
  const [ selectedActivityToRemove, setSelectedActivityToRemove ] = useState<Activity | null>(null)
  const [ tripOwnerRemoveActivityModal, setTripOwnerRemoveActivityModal ] = useState(false)
  const [ activityCheckPointStatus, setActivityCheckPointStatus ] = useState(false)


  function HandleToggleResetTripDetailsModal() {
    setResetTripDetailsModal(prev => !prev)
  }

  async function ResetTripDetails() {
    try {
      await api.delete(`/trips/${tripId}?participantId=${participantId}`)
      router.push('/create-trip')
    } catch (err) {
      console.error('Erro ao cancelar viagem:', err)
    }
  }

  
  function HandleToggleUpdatingTripDetailsModal() {
    setUpdatingTripDetailsModal(prev => !prev)
  }

  async function UpdatingTripDetails() {
    if(!newDestinationTripName) {
      alert('Preencha o novo destino da viagem')
    }

    if(!newStartsAndFinishesDate?.from || !newStartsAndFinishesDate?.to) {
      alert('As datas de início e fim, são de preenchimento obrigatório.')
    }

    await api.patch(`/trips/${tripId}?participantId=${participantId}`, {
      destination: newDestinationTripName,
      starts_at: newStartsAndFinishesDate?.from,
      ends_at: newStartsAndFinishesDate?.to
    })

    HandleToggleUpdatingTripDetailsModal()
    showCheckSplash("Detalhes alterados.")
  }

  function HandleToggleDatePickerModal() {
    setDatePickerModal(prev => !prev)
  }


  function HandleToggleCreateActivityModal() {
    setCreateActivityModal(prev => !prev)
  }

  async function CreateActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const title = data.get('title')
    const date = data.get('date')
    const hour = data.get('hour')

    if(!title || !date || !hour) {
      alert('Todos os campos são obrigatórios para cadastrar uma atividade.')
    }
    
    const occurs_at = new Date(`${date}T${hour}:00`).toISOString()

    const response = await api.post(`/trips/${tripId}/activities`, {
      title: title,
      occurs_at: occurs_at
    })

    const {activityId} = response.data

    HandleToggleCreateActivityModal()
    showCheckSplash("Atividade criada com sucesso.")

    return activityId
  }

  function HandleToggleOwnerRemoveActivityModal(activity?: Activity) {
    if(activity) setSelectedActivityToRemove(activity)
    setTripOwnerRemoveActivityModal(prev => !prev)
  }

  async function DeleteActivity(activityId: string) {
    await api.delete(`/trips/${tripId}/activities`, {
      data: { activityId }
    })

    setDaysOnTrip(prevDays => prevDays.map(day => ({
      ...day,
      activities: day.activities.filter(activity => activity.id !== activityId)
    })))

    setSelectedActivityToRemove(null)
    showCheckSplash("Atividade excluída com sucesso.")
    HandleToggleOwnerRemoveActivityModal()
  }

  function HandleCheckPointsActivityStatus() {
    setActivityCheckPointStatus(prev => !prev)
  }


  function HandleToggleCreateNewLinkModal() {
    setCreateNewLinkModal(prev => !prev)
  }

  async function CreateLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const title = data.get('title')
    const url = data.get('url')

    const response = await api.post(`/trips/${tripId}/links`, {
      title: title,
      url: url
    })

    const { linkId } = response.data

    HandleToggleCreateNewLinkModal()
    showCheckSplash("Link cadastrado com sucesso!")

    return linkId
  }

  function HandleOwnerRemoveLinkOnTripModal(link?: Links) {
    if(link) setSelectedLinkToRemove(link)
    setTripOwnerConfirmRemoveLinkModal(prev => !prev)
  }

  async function RemoveLinkOnTrip(linkId: string) {
    await api.delete(`/trips/${tripId}/links`, {
      data: { linkId }
    })
    setLinksOnTrip(prev => prev.filter((link: Links) => link.id !== linkId))
    setSelectedLinkToRemove(null)
    showCheckSplash("Link deletado com sucesso!")
    HandleOwnerRemoveLinkOnTripModal()
  }

  function HandleToggleOwnerApproveANewLinkSuggestedModal() {
    setOwnerApproveNewLinkModal(prev => {
      const newState = !prev
      if(newState) { OwnerLoadSuggestedLinksFromStorage()}
      return newState
    })
  }

  function OwnerLoadSuggestedLinksFromStorage() {
    const storage = localStorage.getItem('suggestedLinks')
    const parsed = storage ? JSON.parse(storage) : []

    setSuggestedLinks(parsed)
  }

  async function OwnerApproveANewLinkSuggested(link: Omit<Links, 'id'>) {
    const response = await api.post(`/trips/${tripId}/links`, link)
    const { linkId } = response.data

    setLinksOnTrip(prev => [...prev, { id: linkId, ...link}])
    setSuggestedLinks(prev => {
      const filteredLinks = prev.filter(linkSelected => linkSelected.url !== link.url)
      localStorage.setItem('suggestedLinks', JSON.stringify(filteredLinks))

      return filteredLinks
    })

    showCheckSplash("Link inserido aos links já existentes.")
  }

  function OwnerDeleteALinkSuggested(urlLinkToRemove: string) {
    const storage = localStorage.getItem('suggestedLinks')
    if(!storage) return

    const parsed = JSON.parse(storage)
    const updatedList = parsed.filter((l: Links) => l.url !== urlLinkToRemove)

    localStorage.setItem('suggestedLinks', JSON.stringify(updatedList))
    setSuggestedLinks(updatedList)
  }

  function HandleToggleParticipantSuggestedNewLinkModal() {
    setParticipantSuggestedNewLinkModal(prev => !prev)
  }

  function ParticipantSuggestedLinks(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data =  new FormData(e.currentTarget)
    const title = data.get('title') as string
    const url = data.get('url') as string


    if(!title || !data) {
      alert("A sugestão de Links apenas é possivel diante do preenchimento de todos os campos abaixo.")
      return
    }

    const newLink = { title, url }

    const storage = localStorage.getItem('suggestedLinks')
    const parsed = storage ? JSON.parse(storage) : []

    const linkAlreadyExists = parsed.some((link : { url: string }) => link.url === url)

    if(linkAlreadyExists) {
      alert('Este Link já foi sugerido anteriormente')
      return
    }

    const updated = [ ...parsed, newLink ]

    setSuggestedLinks(updated)

    localStorage.setItem('suggestedLinks', JSON.stringify(updated))

    e.currentTarget.reset()
    HandleToggleParticipantSuggestedNewLinkModal()
    showCheckSplash("Sugestão de Link enviada com sucesso.")
  }


  function HandleOwnerCreateNewAParticipantModal() {
    setTripOwnerAddParticipantOnTrip(prev => !prev)
  }

  async function CreateNewParticipant(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const email = data.get('email') as string

    if(!name || !email) {
      alert("Preencha os campos de Nome e Email para adicionar um novo participante.")
    }

    const response = await api.patch(`/trips/${tripId}/participants`, {
      name,
      email
    })

    const { participantId } = response.data

    HandleOwnerCreateNewAParticipantModal()
    showCheckSplash("Convidado adicionado com sucesso!")

    return participantId
  }

  function HandleToggleOwnerApproveNewGuestModal() {
    setOwnerApproveNewGuestModal(prev => {
      const newState = !prev
      if(newState) { OwnerLoadSuggestedParticipantsFromStorage()}
      return newState
    })
  }

  function OwnerLoadSuggestedParticipantsFromStorage() {
    const storage = localStorage.getItem('suggestedParticipant')
    const parsed = storage ? JSON.parse(storage) : []

    setSuggestedParticipants(parsed)
  }

  async function OwnerApproveANewParticipantSuggested(participant: suggestedParticipant) {
    const response = await api.patch(`/trips/${tripId}/participants`, {
      name: participant.name,
      email: participant.email
    })

    const { participantId } = response.data

    HandleToggleOwnerApproveNewGuestModal()
    showCheckSplash("O novo Convidado foi adicionado a lista.")
    return participantId
  }

  function OwnerDeleteAParticipantSuggested(emailParticipantToRemove: string) {
    const storage = localStorage.getItem('suggestedParticipant')
    if(!storage) return

    const parsed = JSON.parse(storage)
    const updatedList = parsed.filter((p: Participant) => p.email !== emailParticipantToRemove)

    localStorage.setItem('suggestedParticipant', JSON.stringify(updatedList))
    setSuggestedParticipants(updatedList)
  }

  function HandleOwnerRemoveParticipantOnTripModal(participant?: Participant) {
    if(participant) setSelectedParticipantToRemove(participant)
    setTripOwnerConfirmRemoveParticipantModal(prev => !prev)
  }

  async function RemoveParticipantOnTrip(participantId: string) {
    await api.delete(`/participants/${participantId}`)
    setParticipants(prev => prev.filter((p: Participant) => p.id !== participantId))
    
    showCheckSplash("Convidado(a) removido.")
    HandleOwnerRemoveParticipantOnTripModal()
  }

  function HandleToggleParticipantSuggestedNewGuestModal() {
    setParticipantSuggestedNewGuestModal(prev => !prev)
  }

  function ParticipantSuggestedGuest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data =  new FormData(e.currentTarget)
    const name = data.get('name') as string
    const email = data.get('email') as string


    if(!name || !email) {
      alert("A sugestão de um novo participante é possivel diante do preenchimento de todos os campos abaixo.")
      return
    }

    const newParticipant = { name, email }

    const storage = localStorage.getItem('suggestedParticipant')
    const parsed = storage ? JSON.parse(storage) : []

    const ParticipantAlreadyExists = parsed.some((guest : { email: string }) => guest.email === email)

    if(ParticipantAlreadyExists) {
      alert('Este Participante já está solicitado a viagem')
      return
    }

    const updated = [ ...parsed, newParticipant ]

    setSuggestedParticipants(updated)

    localStorage.setItem('suggestedParticipant', JSON.stringify(updated))

    e.currentTarget.reset()
    HandleToggleParticipantSuggestedNewGuestModal()
    showCheckSplash("Sugestão de Convidado(a) enviada com sucesso.")
  }

  useEffect(() => {
    async function FetchTrip() {
      try {
        const response = await api.get(`/trips/${tripId}`)
        setTrip(response.data.trip)
      } catch(error) {
        console.log('Error on Fetch Trip Details', error)
      }
    }

    async function FetchActivities() {
      try{
        const response = await api.get(`/trips/${tripId}/activities`)
        setDaysOnTrip(response.data.activities)
      } catch(error) {
        console.log('Error on Handle Fetching activities', error)
      }
    }

    async function FetchParticipants() {
      try {
        const response = await api.get(`trips/${tripId}/participants`)
        setParticipants(response.data.participants)
      } catch(error) {
        console.error('Error on Fetch participants data', error)
      }
    }

    async function FetchParticipant() {
      try {
        const response = await api.get(`/participants/${participantId}`)
        setParticipant(response.data.participant)
      } catch(error) {
        console.log('Error to find a unique participant on trip', error)
      }
    }

    async function FetchLinks() {
      try {
        const response = await api.get(`/trips/${tripId}/links`)
        setLinksOnTrip(response.data.links)
      } catch(error) {
        console.log('Error on Fetch links data', error)
      }
    }

    if(tripId) {
      FetchTrip()
      FetchParticipants()
      FetchActivities()
      FetchLinks()
    }

    if(participantId) {
      FetchParticipant()
    }

  }, [tripId, participantId])

  const participantIsOwnerOnTrip = participant?.is_owner === true

  const formattedTripSelectedDates = 
    trip?.starts_at && trip?.ends_at
    ? format(trip.starts_at, "d' de 'LLLL", { locale: ptBR}).
    concat(' até ').
    concat(format(trip?.ends_at, "d' de 'LLLL", { locale: ptBR}))
    : null
  
  const newFormattedTripSelectedDates = 
    newStartsAndFinishesDate?.from && newStartsAndFinishesDate?.to
    ? format(newStartsAndFinishesDate.from, "d' de 'LLL", { locale: ptBR}).
    concat(' até ').
    concat(format(newStartsAndFinishesDate.to, "d' de 'LLL", { locale: ptBR}))
    : null

  return (
    <div className='h-svh flex justify-center relative'>
      <div className='w-[96%] flex flex-col gap-6 py-5'>

        <HeaderTripInfo
          trip={trip}
          participant={participant}
          formattedTripSelectedDates={formattedTripSelectedDates}
          HandleToggleUpdatingTripDetailsModal={HandleToggleUpdatingTripDetailsModal}
          HandleToggleResetTripDetailsModal={HandleToggleResetTripDetailsModal}
        />

        <div className='flex px-6 py-3 gap-16 overflow-y-auto'>
          <div className='w-[60%]'>
            <div className='flex justify-between mb-6'>
              <h2 className='text-3xl text-zinc-50'>Atividades</h2>
              <Button
                onClick={HandleToggleCreateActivityModal}
              >
                <Plus/>
                Cadastrar atividade
              </Button>
            </div>
            <div className='flex flex-col gap-6'>
              {daysOnTrip.map(day => (
                <TripDay
                  key={day.date}
                  day={day}
                  HandleCheckPointsActivityStatus={HandleCheckPointsActivityStatus}
                  activityCheckPointStatus={activityCheckPointStatus}
                  participantIsOwnerOnTrip={participantIsOwnerOnTrip}
                  HandleToggleOwnerRemoveActivityModal={HandleToggleOwnerRemoveActivityModal}
                />
              ))}
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <div className='flex justify-between'>
                <h3 className='text-zinc-100 text-xl'>Links importantes</h3>
                { participant?.is_owner && (
                  <div className='relative'>
                    <Button
                      onClick={HandleToggleOwnerApproveANewLinkSuggestedModal}
                      colors='secondary'
                    > 
                      Sugestões de links
                    </Button>
                    {suggestedLinks.length > 0 && (
                      <span 
                        className='absolute -top-3 -right-2 px-1.5 py-0.5 rounded-lg
                          text-xs font-bold
                          border border-white bg-red-700'
                      >
                        {suggestedLinks.length}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {linksOnTrip.length > 0 ? (
                <div className='flex flex-col gap-3'>
                  {linksOnTrip.map(link => (
                    <LinksOnTrip
                      key={link.id}
                      link={link}
                      HandleOwnerRemoveLinkOnTripModal={() => HandleOwnerRemoveLinkOnTripModal(link)}
                      participantIsOwnerOnTrip={participantIsOwnerOnTrip}
                    />
                  ))}
                </div>
              ) : (
                <span 
                  className='text-zinc-400 px-3 py-1
                    border-2 border-dashed rounded-lg box-shadow'
                >
                  Nenhum link cadastrado
                </span>
              )}
              
           
              { participant && participant?.is_owner ? (
                <Button 
                  onClick={HandleToggleCreateNewLinkModal}
                  scale='full'
                  colors='secondary'
                >
                  <Plus/>
                  Cadastrar novo Link
                </Button>
              ) : (
                <Button 
                  onClick={HandleToggleParticipantSuggestedNewLinkModal}
                  scale='full'
                  colors='secondary'
                >
                  <Plus/>
                  Sugestão de um novo Link
                </Button>
              )}
              
            </div>

            <div className='h-0.5 w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 ease-in-out'/>

            <div className='flex flex-col gap-6'>
              <div className='flex justify-between'>
                <h3 className='text-zinc-100 text-xl'>Convidados</h3>
                { participant?.is_owner && (
                  <div className='relative'>
                    <Button
                      onClick={HandleToggleOwnerApproveNewGuestModal}
                      colors='secondary'
                    >
                      Sugestão de convidado
                    </Button>
                    {suggestedParticipants.length > 0 && (
                      <span
                        className='absolute -top-3 -right-2 px-1.5 py-0.5 rounded-lg
                          text-xs font-bold
                          border border-white bg-red-700'
                      >
                        {suggestedParticipants.length}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                {participants?.map((participant, index) => (
                  <ParticipantOnTrip
                    key={participant.email}
                    HandleOwnerRemoveParticipantOnTripModal={() => HandleOwnerRemoveParticipantOnTripModal(participant)}
                    participant={participant}
                    participantIsOwnerOnTrip={participantIsOwnerOnTrip}
                    index={index}
                  />
                ))}
              </div>

              { participant?.is_owner ? (
                <Button 
                  onClick={HandleOwnerCreateNewAParticipantModal}
                  scale='full'
                  colors='secondary'
                >
                  <UserPlus/>
                  Adicionar Convidados
                </Button>
              ) : (
                <Button 
                  onClick={HandleToggleParticipantSuggestedNewGuestModal}
                  scale='full'
                  colors='secondary'
                >
                  <UserCog/>
                  Sugerir novo convidado
                </Button>
              )}
              
            </div>
          </div>

        </div>

      </div>
      { resetTripDetailsModal && (
        <ResetTripDetailsModal
          ResetTripDetails={ResetTripDetails}
          HandleToggleResetTripDetailsModal={HandleToggleResetTripDetailsModal}
        />
      )}
      { updatingTripDetailsModal && (
        <UpdatingTripDetailsModal
          UpdatingTripDetails={UpdatingTripDetails}
          HandleToggleUpdatingTripDetailsModal={HandleToggleUpdatingTripDetailsModal}
          setNewDestinationTripName={setNewDestinationTripName}
          newFormattedTripSelectedDates={newFormattedTripSelectedDates}
          newStartsAndFinishesDate={newStartsAndFinishesDate}
          setNewStartsAndFinishesDate={setNewStartsAndFinishesDate}
          HandleToggleDatePickerModal={HandleToggleDatePickerModal}
          datePickerModal={datePickerModal}
        />
      )}
      { createActivityModal && (
        <CreateActivityModal
          HandleToggleCreateActivityModal={HandleToggleCreateActivityModal}
          CreateActivity={CreateActivity}
        />
      )}
      { participant?.is_owner && ownerApproveNewLinkModal && (
        <OwnerApproveLinksModal
          HandleToggleOwnerApproveANewLinkSuggestedModal={HandleToggleOwnerApproveANewLinkSuggestedModal}
          suggestedLinks={suggestedLinks}
          onApprove={OwnerApproveANewLinkSuggested}
          onDelete={OwnerDeleteALinkSuggested}
          participant={participant}
        />
      )}
      { participant?.is_owner && ownerApproveNewGuestModal && (
        <OwnerApproveGuestsModal
          HandleToggleOwnerApproveNewGuestModal={HandleToggleOwnerApproveNewGuestModal}
          suggestedParticipants={suggestedParticipants}
          onApprove={OwnerApproveANewParticipantSuggested}
          onDelete={OwnerDeleteAParticipantSuggested}
        />
      )}
      { participantSuggestedNewLinkModal && (
        <ParticipantSuggestedLinkModal
          HandleToggleParticipantSuggestedNewLinkModal={HandleToggleParticipantSuggestedNewLinkModal}
          ParticipantSuggestedLinks={ParticipantSuggestedLinks}
        />
      )}
      { createNewLinkModal && (
        <RegisterNewLinkModal
          HandleToggleCreateNewLinkModal={HandleToggleCreateNewLinkModal}
          CreateLink={CreateLink}
        />
      )}
      { tripOwnerAddParticipantOnTrip && (
        <OwnerAddNewParticipantModal
          HandleOwnerCreateNewAParticipantModal={HandleOwnerCreateNewAParticipantModal}
          CreateNewParticipant={CreateNewParticipant}
        />
      )}
      { tripOwnerRemoveActivityModal  && selectedActivityToRemove && (
        <RemoveActivityModal
          HandleToggleOwnerRemoveActivityModal={HandleToggleOwnerRemoveActivityModal}
          activity={selectedActivityToRemove}
          DeleteActivity={DeleteActivity}
        />
      )}
      { tripOwnerConfirmRemoveLinkModal && selectedLinkToRemove && (
        <RemoveLinkModal
          HandleOwnerRemoveLinkOnTripModal={HandleOwnerRemoveLinkOnTripModal}
          RemoveLinkOnTrip={RemoveLinkOnTrip}
          link={selectedLinkToRemove}
        />
      ) }
      { tripOwnerConfirmRemoveParticipantModal && selectedParticipantToRemove && (
        <RemoveParticipantModal
          HandleOwnerRemoveParticipantOnTripModal={HandleOwnerRemoveParticipantOnTripModal}
          RemoveParticipantOnTrip={RemoveParticipantOnTrip}
          participant={selectedParticipantToRemove}
        />
      )}
      { participantSuggestedNewGuestModal && trip && (
        <ParticipantSuggestedNewGuestModal
          HandleToggleParticipantSuggestedNewGuestModal={HandleToggleParticipantSuggestedNewGuestModal}
          ParticipantSuggestedGuest={ParticipantSuggestedGuest}
          trip={trip}
        />
      )}
    </div>
  )
}
