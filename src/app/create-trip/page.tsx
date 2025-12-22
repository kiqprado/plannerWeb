'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/lib/axios'

import { Header } from '@/app/elements/header'
import { InitialTripInfo } from './components/initial-trip-information'
import { InitialTripGuestsManager } from './components/initial-trip-guests-manager'
import { TripCreationModal } from './components/trip-creation-modal'
import { EmailInvitesModal } from './components/email-invites-modal'
import { Footer } from '@/app/elements/footer'

import { CreateTripLoadingScreen } from '@/app/animations/create-trip-loading-screen'

import { type DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function CreateTriPage() {
  const router = useRouter()

  const [ destinationTripName, setDestinationTripName ] = useState('')
  const [ startsAndFinishesDate, setStartsAndFinishesDate ] = useState<DateRange | undefined>()
  const [ ownerTripName, setOwnerTripName ] = useState('')
  const [ ownerTripEmail, setOwnerTripEmail ] = useState('')
  const [ emailsToInvite, setEmailsToInvite ] = useState<string[]>([])

  const [ initialTripDetailsModal, setInitialTripDetailsModal ] = useState(false)
  const [ datePickerModal, setDatePickerModal ] = useState(false)
  const [ tripInvitesEmailsModal, setTripInvitesEmailsModal ] = useState(false)
  const [ tripCreationModal, setTripCreationModal ] = useState(false)

  const [ creatingTripOnLoad, setCreatingTripOnLoad ] = useState(false)

  function HandleAddNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
    const data = new FormData(e.currentTarget)
    const email = data.get('email')
  
    if(typeof email !== 'string') {
      alert('Insira um Email válido no campo')
      e.currentTarget.reset()
      return
    }
  
    if(emailsToInvite.includes(email)) {
      alert('Parece que este Email já foi inserido, insira o próximo convidado.')
      e.currentTarget.reset()
      return
    }

    if(email === '') {
      alert('Digite um Email no campo para convidá-lo.')
      return
    }
  
    setEmailsToInvite([...emailsToInvite, email])
  
    e.currentTarget.reset()
  }
  
  function HandleRemoveEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(emailsToInvite.filter(email => email !== emailToRemove))
  }

  async function CreateTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(!destinationTripName) {
      return
    }

    if(!startsAndFinishesDate?.from || !startsAndFinishesDate?.to) {
      return
    }

    if(!ownerTripName || !ownerTripEmail) {
      return
    }

    setCreatingTripOnLoad(true)

    const response = await api.post('/trips', {
      destination: destinationTripName,
      starts_at: startsAndFinishesDate?.from,
      ends_at: startsAndFinishesDate?.to,
      owner_name: ownerTripName,
      owner_email: ownerTripEmail,
      emails_to_invite: emailsToInvite
    })

    const { tripId, participantId } = response.data

    router.push(`/trips/${tripId}?participantId=${participantId}`)
  }

  function HandleToggleInitialTripDetailsModal() {
    setInitialTripDetailsModal(prev => !prev)
  }

  function HandleToggleDatePickerModal() {
    setDatePickerModal(prev => !prev)
  }
  
  function HandleTripInvitesEmailsModal() {
    setTripInvitesEmailsModal(prev => !prev)
  }

  function HandleToggleTripCreationModal() {
    setTripCreationModal(prev => !prev)
  }

  const formattedTripSelectedDates = 
  startsAndFinishesDate?.from && startsAndFinishesDate?.to
  ? format(startsAndFinishesDate.from, "d' de 'LLL", { locale: ptBR}).
  concat(' até ').
  concat(format(startsAndFinishesDate.to, "d' de 'LLL", { locale: ptBR}))
  : null

  return (
    <div className="h-svh flex relative">
      <div className="m-auto w-full flex flex-col gap-10 items-center">
        <div 
          className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[66%] 
            bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat"
        />
        <Header/>
        <div className='flex flex-col w-full items-center gap-4'>
          <InitialTripInfo
            HandleToggleDatePickerModal={HandleToggleDatePickerModal}
            HandleToggleInitialTripDetailsModal={HandleToggleInitialTripDetailsModal}
            setDestinationTripName={setDestinationTripName}
            initialTripDetailsModal={initialTripDetailsModal}
            formattedTripSelectedDates={formattedTripSelectedDates}
            datePickerModal={datePickerModal}
            startsAndFinishesDate={startsAndFinishesDate}
            setStartsAndFinishesDate={setStartsAndFinishesDate}
          />
          { initialTripDetailsModal && (
            <InitialTripGuestsManager
              HandleToggleTripCreationModal={HandleToggleTripCreationModal}
              HandleTripInvitesEmailsModal={HandleTripInvitesEmailsModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>
        <Footer/>
      </div>
      { creatingTripOnLoad && 
        <CreateTripLoadingScreen/>
      }
      { tripInvitesEmailsModal && (
        <EmailInvitesModal
          HandleTripInvitesEmailsModal={HandleTripInvitesEmailsModal}
          HandleAddNewEmailToInvite={HandleAddNewEmailToInvite}
          HandleRemoveEmailFromInvites={HandleRemoveEmailFromInvites}
          emailsToInvite={emailsToInvite}
        />
      )}
      { tripCreationModal && (
        <TripCreationModal
          CreateTrip={CreateTrip}
          HandleToggleTripCreationModal={HandleToggleTripCreationModal}
          setOwnerTripName={setOwnerTripName}
          setOwnerTripEmail={setOwnerTripEmail}
          destinationTripName={destinationTripName}
          startsAndFinishesDate={startsAndFinishesDate}
        />
      )} 
    </div>
  )
}