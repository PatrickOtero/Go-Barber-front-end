import { useContext } from 'react'
import loginContext from '../../contexts/loggedUser/index'

function useLoginContext() {
  return useContext(loginContext)
}

export default useLoginContext
