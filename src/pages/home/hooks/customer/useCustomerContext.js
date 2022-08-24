import { useContext } from 'react'
import customerContext from '../../contexts/customer/index'

function useCustomerContext() {
  return useContext(customerContext)
}

export default useCustomerContext
