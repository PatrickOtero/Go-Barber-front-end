import './styles.css'
import loginBackground from './assets/loginBackground.svg'
import logo from './assets/logo.svg'
import createAccount from './assets/createAccount.svg'
import emailIcon from './assets/emailIcon.svg'
import passIcon from './assets/passIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import useLoginContext from '../../hooks/loggedUser/useLoginContext'
import { useEffect } from 'react'
import useUsersContext from '../../hooks/users/useUsersContext'

const LoginPage = () => {
  const {
    setUser_email,
    user_email,
    setUser_password,
    user_password,
    setUserDeleted
  } = useUsersContext()

  const { handleUserLogin, loginError, setLoginError, token } = useLoginContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/home')
    }
  }, [token])

  useEffect(() => {
    setLoginError("");
    setUser_password("");
    setUserDeleted(false);
  }, [])

  const handleLoginByKeyPressed = event => {
    if (event.key === "Enter") {
      handleUserLogin(user_email, user_password)
    }
  }
  
  return (
    <div className="LoginPage">
      <main>
        <section className="login-side">
          <form>
            <img src={logo} alt="A logo deveria estar aqui" />
            {loginError && <h1 className="login-errors">{loginError}</h1>}
            <div className="login-side-main">
              <h1>Faça seu login</h1>
              <div className="login-input email-input">
                <img src={emailIcon} alt="ícone de email" />
                <input
                  value={user_email}
                  onChange={(e) => setUser_email(e.target.value)}
                  type="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="login-input password-input">
                <img src={passIcon} alt="ícone de cadeado" />
                <input
                  value={user_password}
                  onChange={(e) => setUser_password(e.target.value)}
                  type="password"
                  placeholder="Senha"
                />
              </div>
              <button
                tabIndex={0}
                type="button"
                onClick={() => handleUserLogin(user_email, user_password)}
                onKeyDown={handleLoginByKeyPressed}
              >
                Entrar
              </button>
              <Link className="forgot-password" to="/passRecover">Esqueci minha senha</Link>
            </div>
          </form>
          <div className="create-account-link">
            <img src={createAccount} alt="link para cadastro" />
            <Link to="/register">Criar conta</Link>
          </div>
        </section>
        <section className="background-side">
          <img
            className="login-logo"
            src={loginBackground}
            alt="cadê o barbeiro?"
          />
        </section>
      </main>
    </div>
  )
}

export default LoginPage
