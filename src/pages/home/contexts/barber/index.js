import { createContext } from 'react'
import useBarberContextProvider from '../../hooks/barber/useBarberContextProvider'

const barberContext = createContext({})

export function BarberContextProvider(props) {
  const barberContextProvider = useBarberContextProvider()
  return (
    <barberContext.Provider value={barberContextProvider}>
      {props.children}
    </barberContext.Provider>
  )
}

export default barberContext
