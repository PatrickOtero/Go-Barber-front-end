import './styles.css'
import userIcon from '../../assets/userIcon.png'
import clockIcon from '../../assets/clockIcon2.svg'
import calendarIcon from '../../assets/calendarIcon.svg'
import { useEffect } from 'react'
import useBarberContext from '../../hooks/barber/useBarberContext'
import useReserveContext from '../../../../hooks/reserves/useReserveContext'

const BarbersList = ({ setBarberSelected, setBarberName }) => {
  const {
    barbersList,
    barbersMessage,
    handleListBarbers,
  } = useBarberContext()

  const { setReserveBarberId } = useReserveContext()

  useEffect(() => {
    const handleLoadBarbersList = async () => {
      await handleListBarbers()
    }

    handleLoadBarbersList()
  }, [])

  return (
    <div className="BarbersList">
      {barbersList.length &&
        !barbersMessage &&
        barbersList.map((barber) => {
          return (
            <div
              key={barber.id}
              onClick={() => {
                setReserveBarberId(barber.id)
                setBarberSelected(true)
                setBarberName(barber.barber_name)
              }}
              className="barber-list-container"
            >
              <div className="barber-list-main">
                <div className="barber-list-border"></div>
                <img src={userIcon} alt="foto do cliente" />
                <div className="barber-list-info">
                  <b>{barber.barber_name}</b>
                  <div className="barber-list-date-container">
                    <div className="barber-list-date day">
                      <img src={calendarIcon} alt="icone de relógio" />
                      <span className="list-clock-time">Segunda à sexta</span>
                    </div>
                    <div className="barber-list-date hour">
                      <img src={clockIcon} alt="icone de relógio" />
                      <span className="list-clock-time">8h às 18h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      {!barbersList.length && barbersMessage && <h1>{barbersMessage}</h1>}
    </div>
  )
}

export default BarbersList
