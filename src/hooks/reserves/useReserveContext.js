import { useContext } from 'react'
import reserveContext from '../../contexts/reserves/index'

function useReserveContext() {
  return useContext(reserveContext)
}

export default useReserveContext
