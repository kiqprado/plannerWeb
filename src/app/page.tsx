'use client'

import Link from'next/link'

import { Header } from './elements/header'

import { AirplaneInFlightIcon } from '@phosphor-icons/react'

export default function Home() {
  return(
    <div className='h-svh flex relative'>
      <div 
        className="absolute -z-10 w-[80%] h-[66%]
          left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
          bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat"/>
      <div 
        className='m-auto flex flex-col items-center'
      >
        <div className='absolute z-10 top-[31%]'>
          <Header/>
        </div>
        
        <div className='absolute bottom-[31%]'>
          <Link
          href={'/create-trip'}
          className='group relative flex py-2
            min-w-76 rounded-lg box-shadow
            bg-lime-500 hover:bg-lime-400 text-lime-950
            overflow-hidden'
          >
            <AirplaneInFlightIcon
              className='size-6 absolute -left-7 top-1/2 -translate-y-1/2
                group-hover:translate-x-[1500%]
                transition-transform duration-2000 ease-in-out'
            />
            <span className='w-full text-center font-bold tracking-wider'>Iniciar viagem</span>
          </Link>
        </div>
      </div>
    </div>
  )
}