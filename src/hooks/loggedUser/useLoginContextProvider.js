import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { api } from '../../services/axios'

const useLoginContextProvider = () => {
  const [token, setToken] = useLocalStorage('token', '')
  const [userData, setUserData] = useLocalStorage('userData', {})
  const [userType, setUserType] = useLocalStorage('userType', '')
  const [loginError, setLoginError] = useState("")
  const [userNameInitials, setUserNameInitials] = useState("");

  const loginUserNameInitialsObtainer = (object) => (object.user_name.split(" ").length > 1 ? object.user_name.split(" ")[0].substr(0, 1) + object.user_name.split(" ")[1].substr(0, 1) : object.user_name.split(" ")[0].substr(0, 2));

  const loginCustomerNameInitialsObtainer = (object) => (object.customer_name.split(" ").length > 1 ? object.customer_name.split(" ")[0].substr(0, 1) + object.customer_name.split(" ")[1].substr(0, 1) : object.customer_name.split(" ")[0].substr(0, 2));

  const handleUserLogin = async (user_email, user_password) => {
    setLoginError('')

    const body = {
      user_email,
      user_password,
    }
    try {
      await api.post('/user/login', body).then(finalResponse => {
        const { token, userType, ...userInfo } = finalResponse.data;

        if (userInfo) {
          setUserData(userInfo)
          setUserType(userType)
        }
  
        if (token) {
          setToken(token)
        }
      })

    } catch (error) {
      setLoginError(error.response.data.message)
    }
  }

  return {
    handleUserLogin,
    token,
    setToken,
    userData,
    setUserData,
    userType,
    setUserType,
    setLoginError,
    loginError,
    loginUserNameInitialsObtainer,
    loginCustomerNameInitialsObtainer,
    userNameInitials,
    setUserNameInitials,
  }
}

export default useLoginContextProvider
