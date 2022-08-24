import HomeHeader from './components/header'
import useLoginContext from '../../hooks/loggedUser/useLoginContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BarberHome from './components/barberHome'
import CustomerHome from './components/customerHome'
import './styles.css'

const HomePage = () => {
  const { token, userType } = useLoginContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (!token || token === 'jwt expired') {
      navigate('/')
    }
  }, [token])

  return (
    <div className="HomePage">
      <header>
        <HomeHeader home />
      </header>

      <div className="home-main-container">
        {userType === 'barber' && <BarberHome />}
        {userType === 'customer' && <CustomerHome />}
      </div>
    </div>
  )
}

export default HomePage
