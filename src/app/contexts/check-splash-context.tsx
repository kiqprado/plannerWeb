'use client'

import { createContext, useContext, useState, useCallback } from 'react'

import { CheckSplashAnimation } from '../animations/check-splash-animation'

interface ICheckSplashContext {
  showCheckSplash: (title: string) => void
}

const CheckSplashContext = createContext<ICheckSplashContext>({
  showCheckSplash: () => {}
})

export function CheckSplashProvider({ children } : { children: React.ReactNode }) {
  const [ title, setTitle ] = useState<string | null>(null)

  const showCheckSplash = useCallback(( title: string ) => {
    setTitle(title)
    setTimeout(() => setTitle(null), 2000)
  }, [])

  return (
    <CheckSplashContext.Provider value={{ showCheckSplash }}>
      { children }
      { title && <CheckSplashAnimation title={ title }/>}
    </CheckSplashContext.Provider>
  )
}

export function useCheckSplash() {
  return useContext(CheckSplashContext)
}