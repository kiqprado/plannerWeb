import { Links } from '../[tripId]/page'

import Link from 'next/link'

import { Link2, X } from 'lucide-react'

interface IlinksOnTrip {
  HandleOwnerRemoveLinkOnTripModal: () => void
  link: Links
  participantIsOwnerOnTrip: boolean
}

export function LinksOnTrip({
  link,
  HandleOwnerRemoveLinkOnTripModal,
  participantIsOwnerOnTrip
}: IlinksOnTrip) {
  return(
    <div 
      key={link.url}
      className='flex items-center justify-between group'
    >
      <div className='flex flex-col'>
        <span className='text-zinc-100 text-lg'>{link.title}</span>
        <Link
          href={link.url}
          target='_blank'
          className='text-zinc-300 text-sm truncate max-w-88
            hover:text-cyan-500 transition-colors duration-300 ease-in-out'
        >
          {link.url}
        </Link>
      </div>
      <div className='flex items-center gap-3'>
        <Link2 className='text-zinc-300'/>
        { participantIsOwnerOnTrip && (
          <button
            onClick={HandleOwnerRemoveLinkOnTripModal}
            title="Excluir este Link?"
            className="w-0 opacity-0 scale-0 overflow-hidden
              group-hover:w-8 group-hover:opacity-100 group-hover:scale-100
              group-hover:text-red-500 group-hover:brightness-125
              transition-all duration-500 ease-in-out"
          >
            <X className=''/>
          </button>
        )} 
      </div>
    </div>
  )
}
