import './styles.css'
import logo from './assets/logo.svg'
import closeIcon from './assets/closeIcon.svg'
import arrowIcon from './assets/arrowIcon.svg'
import leftArrowIcon from './assets/leftArrowIcon.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginContext from '../../../../hooks/loggedUser/useLoginContext'

const HomeHeader = ({ home }) => {
  const [profileEditModal, setProfileEditModal] = useState(false)
  const [profileExitModal, setProfileExitModal] = useState(false)

  const { userData, setToken, loginUserNameInitialsObtainer, userNameInitials, setUserNameInitials } = useLoginContext()

  useEffect(() => {
    if (userData.user_name) {
      const userInitials = loginUserNameInitialsObtainer(userData);
      setUserNameInitials(userInitials.toUpperCase());
    }
  }, [userData]);

  const navigate = useNavigate()

  return (
    <div className="HomeHeader">
      {home && (
        <>
          <div className="header-main">
            <img src={logo} alt="A logo deveria estar aqui" />
            <div className="header-user-info">
              <div className='userName-initials'>
                <b className='initials-text'>{userNameInitials}</b>
              </div>
              <div className="info-texts">
                <span>Bem vindo,</span>
                {userData.user_name && <b>{userData.user_name}</b>}
              </div>
              <img
                onClick={() => setProfileEditModal(!profileEditModal)}
                className="header-arrow-icon"
                src={arrowIcon}
                alt="seta"
              />
              {profileEditModal && (
                <div className="header-profile-modal">
                  <button onClick={() => navigate('/Profile')} type="button">
                    Editar perfil
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="header-exit-section">
            <img
              className="header-exit-icon"
              onClick={() => setProfileExitModal(!profileExitModal)}
              src={closeIcon}
              alt="botão de saída"
            />
            {profileExitModal && (
              <button type="button" onClick={() => setToken('')}>
                Deslogar
              </button>
            )}
          </div>
        </>
      )}
      {!home && (
        <img
          onClick={() => navigate('/Home')}
          className="profile-left-arrow"
          src={leftArrowIcon}
          alt="seta para esquerda"
        />
      )}
    </div>
  )
}

export default HomeHeader
