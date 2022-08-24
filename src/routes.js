import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginContextProvider } from './contexts/loggedUser'
import LoginPage from './pages/login/login'
import HomePage from './pages/home'
import RegisterPage from './pages/register'
import ProfilePage from './pages/profile'
import { UsersContextProvider } from './contexts/users'
import { BarberContextProvider } from './pages/home/contexts/barber'
import AppointmentSuccessPage from './pages/appointmentSuccess'
import RecoverPass from './pages/login/components/passRecover/passRecover'
import NewPass from './pages/login/components/newPass/newPass'
import { ReserveContextProvider } from './contexts/reserves'

function App() {
  return (
    <div className="App">
      <Router>
        <LoginContextProvider>
          <UsersContextProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/passrecover" element={<RecoverPass />} />
              <Route path="/newpass" element={<NewPass />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </UsersContextProvider>
          <ReserveContextProvider>
            <BarberContextProvider>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/successPage" element={<AppointmentSuccessPage />} />
              </Routes>
            </BarberContextProvider>
          </ReserveContextProvider>
        </LoginContextProvider>
      </Router>
    </div>
  )
}

export default App
