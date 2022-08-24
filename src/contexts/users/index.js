import { createContext } from 'react'
import useUsersContextProvider from '../../hooks/users/useUsersContextProvider'

const usersContext = createContext({})

export function UsersContextProvider(props) {
  const usersContextProvider = useUsersContextProvider()
  return (
    <usersContext.Provider value={usersContextProvider}>
      {props.children}
    </usersContext.Provider>
  )
}

export default usersContext
