import { useState } from "react"
import { apiAuth } from "../../../../services/axios"

const useBarberContextProvider = () => {
  const [barbersList, setBarbersList] = useState([])
  const [barbersMessage, setBarbersMessage] = useState('')

  const handleListBarbers = async () => {
    setBarbersMessage('')
    try {
      await apiAuth.get(
        '/customer/barbers/list').then(finalResponse => {
          if (finalResponse.data.length) setBarbersList(finalResponse.data)
          
          if (finalResponse.data.message) setBarbersMessage(finalResponse.data.message)
        })

    } catch (error) {
      setBarbersMessage(error.response.data.message)
    }
  }

  return {
    handleListBarbers,
    barbersList,
    barbersMessage,
  }
}

export default useBarberContextProvider
