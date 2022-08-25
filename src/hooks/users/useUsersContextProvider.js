import { useState } from 'react'
import { api, apiAuth } from '../../services/axios'

const useUsersContextProvider = () => {
  const [user_name, setUser_name] = useState('')
  const [user_email, setUser_email] = useState('')
  const [user_current_password, setUser_current_password] = useState('')
  const [user_password, setUser_password] = useState('')
  const [user_confirmPassword, setUser_confirmPassword] = useState('')
  const [passError, setPassError] = useState('')
  const [profileErrors, setProfileErrors] = useState('')

  const [register_name, setRegister_name] = useState('')
  const [register_email, setRegister_email] = useState('')
  const [register_password, setRegister_password] = useState('')
  const [registerMessages, setRegisterMessages] = useState('')

  const [recoverMessages, setRecoverMessages ] = useState("")
  const [linkSent, setLinkSent] = useState(false);
  const [successfullyRedefined, setSuccessfullyRedefined] = useState(false);

  const [modalUserPassword, setModalUserPassword] = useState("");
  const [userDeleted, setUserDeleted] = useState(false);

  const handleUserRegistration = async (userType) => {
    setRegisterMessages('')

    if (!register_name && !register_email)
      return setRegisterMessages('Preencha algum campo')

    if (!userType)
      return setRegisterMessages('Escolha o tipo de usuário para cadastro')

    let body

    if (userType === 'customer') {
      body = {
        customer_name: register_name,
        customer_email: register_email,
        customer_password: register_password,
      }
      } else {
      body = {
        barber_name: register_name,
        barber_email: register_email,
        barber_password: register_password,
      }
    }

    try {
      await api.post(
        `/${userType}/register`, body
      ).then(finalResponse => {
          setRegisterMessages(finalResponse.data.message)
          setRegister_name("")
          setRegister_email("")
          setRegister_password("")
        })
                
        setRegister_password('')
      } catch (error) {
        setRegisterMessages(error.response.data.message)
    }
  }

  const handleUserEdit = async (userType, changeUserName) => {
    setPassError('')
    setProfileErrors('')

    if (user_password && user_confirmPassword !== user_password)
      return setPassError('As senhas não conferem')

    if (!user_name && !user_email)
      return setProfileErrors('Preencha algum campo')

    const body = {
      user_name,
      user_email,
      user_password,
      user_current_password,
    }

    try {
      await apiAuth.put(`/${userType}/edit`, body).then(finalResponse => {
          setProfileErrors(finalResponse.data.message)
      })

      setUser_current_password('')
      setUser_password('')
      setUser_confirmPassword('')

      changeUserName({ user_name, user_email })
    } catch (error) {
      setProfileErrors(error.response.data.message)
    }
  }

  const handleUserDelete = async(userType) => {
    setProfileErrors("");

    if (!modalUserPassword.length) {
      setProfileErrors("É obrigatório informar sua senha")
      return;
    }

    try {
      await apiAuth.delete(`/${userType}/delete/${modalUserPassword}`).then(finalResponse => {
          setProfileErrors(finalResponse.data.message)

          console.log(finalResponse)
          setUserDeleted(true);
          setModalUserPassword("")
      })

    } catch (error) {
      setProfileErrors(error.response.data.message)
    }
  }

  const handleRecoverPassword = async (tokenSetter) => {
    setRecoverMessages("");

    const body = {
      user_email
    }

    try {
      await api.post("/user/recoverPass", body).then(finalResponse => {
        setRecoverMessages(finalResponse.data.message)
        tokenSetter(finalResponse.data.token)

        setLinkSent(true);
      })

      setUser_email("")
    } catch (error) {
      setRecoverMessages(error.response.data.message)
    }
  }

  const handleSetNewPassword = async (tokenSetter) => {
    setRecoverMessages("");
    setSuccessfullyRedefined(false);

    if (user_password !== user_confirmPassword) {
      setRecoverMessages("As senhas não estão iguais!")
      return
    }

    const body = {
      user_password
    }

    try {
      await apiAuth.post("/user/newPass", body).then(finalResponse => {
        setRecoverMessages(finalResponse.data.message)
        tokenSetter("")
        setSuccessfullyRedefined(true)
      })

      setUser_email("")
    } catch (error) {
      setRecoverMessages(error.response.data.message)
    }
  }

  return {
    handleUserEdit,
    user_name,
    user_email,
    user_password,
    user_confirmPassword,
    user_current_password,
    setUser_name,
    setUser_email,
    setUser_password,
    setUser_confirmPassword,
    setUser_current_password,
    setPassError,
    passError,
    setProfileErrors,
    profileErrors,
    register_name,
    register_email,
    register_password,
    setRegister_name,
    setRegister_email,
    setRegister_password,
    handleUserRegistration,
    registerMessages,
    setRegisterMessages,
    handleRecoverPassword,
    recoverMessages,
    setRecoverMessages,
    handleSetNewPassword,
    linkSent,
    setLinkSent,
    successfullyRedefined,
    setSuccessfullyRedefined,
    handleUserDelete,
    modalUserPassword,
    setModalUserPassword,
    userDeleted,
    setUserDeleted
  }
}

export default useUsersContextProvider
