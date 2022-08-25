import HomeHeader from '../home/components/header'
import './styles.css'
import emailIcon from './assets/emailIcon.svg'
import nameIcon from './assets/nameIcon.svg'
import passIcon from './assets/passIcon.svg'
import useLoginContext from '../../hooks/loggedUser/useLoginContext'
import { useEffect, useState } from 'react'
import useUsersContext from '../../hooks/users/useUsersContext'
import ExclusionModal from './components/exclusionModal'

const ProfilePage = () => {
  const [exclusionModal, setExclusionModal] = useState(false);

  const { userData, userType, setUserData, loginUserNameInitialsObtainer, setUserNameInitials, userNameInitials } = useLoginContext()
  const {
    handleUserEdit,
    user_name,
    setUser_name,
    user_email,
    setUser_email,
    user_password,
    user_confirmPassword,
    user_current_password,
    setUser_password,
    setUser_confirmPassword,
    setUser_current_password,
    passError,
    setPassError,
    setProfileErrors,
    profileErrors,
  } = useUsersContext()

  useEffect(() => {
    if (userData.user_name) {
      const userInitials = loginUserNameInitialsObtainer(userData);
      setUserNameInitials(userInitials.toUpperCase());
    }
  }, [userData]);

  useEffect(() => {
    setPassError('')
    setProfileErrors('')
    setUser_name('')
    setUser_email('')
    setUser_current_password('')
    setUser_password('')
    setUser_confirmPassword('')
  }, [])
  return (
    <div className="ProfilePage">
      <header>
        <HomeHeader home={false} />
      </header>
      <div className="profile-container">
        <main>
          { exclusionModal && <ExclusionModal userType={userType} setExclusionModal={setExclusionModal}/>}
        <div className='userName-initials-profile'>
          <b className='initials-text-profile'>{userNameInitials}</b>
        </div>
          <form>
            {profileErrors && (
              <h1 className="profile-errors">{profileErrors}</h1>
            )}
            <h1>Meu perfil</h1>
            <div className="profile-form-top">
              <div className="profile-input">
                <img src={nameIcon} alt="icone de pessoa" />
                <input
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  type="text"
                  placeholder="Nome"
                />
              </div>
              <div className="profile-input">
                <img src={emailIcon} alt="icone de pessoa" />
                <input
                  value={user_email}
                  onChange={(e) => setUser_email(e.target.value)}
                  type="email"
                  placeholder="E-mail"
                />
              </div>
            </div>
            <div className="profile-form-bottom">
              <div className="profile-input">
                <img src={passIcon} alt="icone de pessoa" />
                <input
                  value={user_current_password}
                  onChange={(e) => setUser_current_password(e.target.value)}
                  type="password"
                  placeholder="Senha atual"
                />
              </div>
              <div className="profile-input">
                <img src={passIcon} alt="icone de pessoa" />
                <input
                  value={user_password}
                  onChange={(e) => setUser_password(e.target.value)}
                  type="password"
                  placeholder="Nova senha"
                />
              </div>
              <div className="profile-input">
                <img src={passIcon} alt="icone de pessoa" />
                <input
                  value={user_confirmPassword}
                  onChange={(e) => setUser_confirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirmar senha"
                />
              </div>
              {passError && <h1 className="profile-errors">{passError}</h1>}
            </div>
            <div className='profile-buttons'>
              <button
                type="button"
                onClick={() => handleUserEdit( userType, setUserData)}
              >
                Confirmar mundanças
              </button>
              <button className='profile-button-delete'
                type="button"
                onClick={() => {
                  setProfileErrors("")
                  setExclusionModal(true)
                }}
              >
                Excluir minha conta
              </button>
              </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default ProfilePage
