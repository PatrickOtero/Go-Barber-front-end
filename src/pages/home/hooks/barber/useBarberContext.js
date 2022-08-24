import { useContext } from 'react'
import barberContext from '../../contexts/barber/index'

function useBarberContext() {
  return useContext(barberContext)
}

export default useBarberContext
