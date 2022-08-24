import { useContext } from 'react'
import usersContext from '../../contexts/users/index'

function useUsersContext() {
  return useContext(usersContext)
}

export default useUsersContext
