import { createContext } from 'react'
import useReserveContextProvider from '../../hooks/reserves/useReserveContextProvider'

const reserveContext = createContext({})

export function ReserveContextProvider(props) {
  const reserveContextProvider = useReserveContextProvider()
  return (
    <reserveContext.Provider value={reserveContextProvider}>
      {props.children}
    </reserveContext.Provider>
  )
}

export default reserveContext
