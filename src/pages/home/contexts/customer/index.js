import { createContext } from 'react'
import useCustomerContextProvider from '../../hooks/customer/useCustomerContextProvider'

const customerContext = createContext({})

export function CustomerContextProvider(props) {
  const customerContextProvider = useCustomerContextProvider()
  return (
    <customerContext.Provider value={customerContextProvider}>
      {props.children}
    </customerContext.Provider>
  )
}

export default customerContext
