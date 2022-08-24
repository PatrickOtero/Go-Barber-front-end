import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useUsersContext from '../../hooks/users/useUsersContext'
import emailIcon from './assets/emailIcon.svg'
import leftArrowIcon from './assets/leftArrowIcon.svg'
import logo from './assets/logo.svg'
import nameIcon from './assets/nameIcon.svg'
import passIcon from './assets/passIcon.svg'
import registerBackground from './assets/registerBackground.svg'
import './styles.css'

const RegisterPage = () => {
  const [registerUserType, setRegisterUserType] = useState('')
  const {
    handleUserRegistration,
    register_name,
    register_email,
    register_password,
    setRegister_name,
    setRegister_email,
    setRegister_password,
    registerMessages,
    setRegisterMessages
  } = useUsersContext()

  useEffect(() => {
    setRegisterMessages("");
  }, [])

  return (
    <div className="RegisterPage">
      <main>
        <section className="background-side">
          <img
            className="register-background"
            src={registerBackground}
            alt="Salão de cabeleireiro"
          />
        </section>
        <section className="register-side">
          <form>
            <img src={logo} alt="A logo deveria estar aqui" />
            {registerMessages && (
              <h1 className="register-messages">{registerMessages}</h1>
            )}
            <div className="register-side-main">
              <div className="user-type-container">
                <b
                  onClick={() => setRegisterUserType('customer')}
                  className={`${
                    registerUserType === 'customer' ? 'active' : ''
                  }`}
                >
                  Sou cliente
                </b>
                <b
                  onClick={() => setRegisterUserType('barber')}
                  className={`${registerUserType === 'barber' ? 'active' : ''}`}
                >
                  Sou cabeleireiro
                </b>
              </div>
              <div className="register-input name-input">
                <img src={nameIcon} alt="ícone de pessoa" />
                <input
                  value={register_name}
                  onChange={(e) => setRegister_name(e.target.value)}
                  type="text"
                  placeholder="Nome"
                />
              </div>
              <div className="register-input email-input">
                <img src={emailIcon} alt="ícone de email" />
                <input
                  value={register_email}
                  onChange={(e) => setRegister_email(e.target.value)}
                  type="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="register-input password-input">
                <img src={passIcon} alt="ícone de cadeado" />
                <input
                  value={register_password}
                  onChange={(e) => setRegister_password(e.target.value)}
                  type="password"
                  placeholder="Senha"
                />
              </div>
              <button
                type="button"
                onClick={() => handleUserRegistration( registerUserType)}
              >
                Cadastrar
              </button>
              <div className="login-page-link">
                <img src={leftArrowIcon} alt="seta para esquerda" />
                <Link to="/">Voltar para o login</Link>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default RegisterPage
