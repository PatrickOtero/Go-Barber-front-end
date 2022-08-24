import './styles.css'
import loginBackground from '../../assets/loginBackground.svg'
import logo from '../../assets/logo.svg'
import emailIcon from '../../assets/emailIcon.svg'
import useUsersContext from '../../../../hooks/users/useUsersContext'
import useLoginContext from '../../../../hooks/loggedUser/useLoginContext'
import { useEffect} from 'react'

const RecoverPass = () => {
  const {
    setUser_email,
    user_email,
    handleRecoverPassword,
    recoverMessages,
     setRecoverMessages,
     linkSent,
     setLinkSent
  } = useUsersContext()

  const { setToken } = useLoginContext()

  useEffect(() => {
    setRecoverMessages("")

    setLinkSent(false)
  }, [])
  
  return (
    <div className="RecoverPass">
      <main>
        <section className="login-side">
          <form>
            <img src={logo} alt="A logo deveria estar aqui" />
            {recoverMessages && <h1 className="recover-errors">{recoverMessages}</h1>}
            <div className="login-side-main">
              <h1>Insira seu e-mail</h1>
              <div className="login-input email-input">
                <img src={emailIcon} alt="ícone de email" />
                <input
                  disabled={linkSent}
                  value={user_email}
                  onChange={(e) => setUser_email(e.target.value)}
                  type="email"
                  placeholder="Seu e-mail registrado"
                />
              </div>
              <button
              disabled={linkSent}
                type="button"
                onClick={() => {
                  handleRecoverPassword(setToken)
                }}
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
          <div className="create-account-link">
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

export default RecoverPass
