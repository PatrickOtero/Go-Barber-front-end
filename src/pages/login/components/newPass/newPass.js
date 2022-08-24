import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUsersContext from '../../../../hooks/users/useUsersContext'
import useLoginContext from '../../../../hooks/loggedUser/useLoginContext'
import loginBackground from '../../assets/loginBackground.svg'
import logo from '../../assets/logo.svg'
import passIcon from '../../assets/passIcon.svg'
import './styles.css'

const NewPass = () => {
  const {
    setUser_password,
    user_password,
    user_confirmPassword,
    setUser_confirmPassword,
    handleSetNewPassword,
    recoverMessages,
    successfullyRedefined,
    setSuccessfullyRedefined
  } = useUsersContext()

  const {setToken} = useLoginContext();

  const navigate = useNavigate();

  useEffect(() => {
    setSuccessfullyRedefined(false)
  }, [])

  useEffect(() => {
    if (recoverMessages === "Não autorizado") {
      navigate("/")
    }
  }, [recoverMessages])

  useEffect(() => {
    if(successfullyRedefined) {
      navigate("/")
    }

  }, [successfullyRedefined])
  
  return (
    <div className="NewPass">
      <main>
        <section className="login-side">
          <form>
            <img src={logo} alt="A logo deveria estar aqui" />
            {recoverMessages && <h1 className="recover-errors">{recoverMessages}</h1>}
            <div className="login-side-main">
               <h1>Redefinição de senha</h1>

              <div className="login-input email-input">
                <label htmlFor='Pass'>Nova senha</label>
                <img src={passIcon} alt="ícone de cadeado" />

                <input
                  id="pass"
                  value={user_password}
                  onChange={(e) => setUser_password(e.target.value)}
                  type="password"
                  placeholder="Nova senha"
                />

              <div className="login-input email-input">
                <label htmlFor='confirmPass'>Confirme a nova senha</label>
                <img src={passIcon} alt="ícone de cadeado" />

                <input
                  id='confirmPass'
                  value={user_confirmPassword}
                  onChange={(e) => setUser_confirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirmação de senha"
                />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleSetNewPassword(setToken)
                }}
              >
                Redefinir a senha
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

export default NewPass
