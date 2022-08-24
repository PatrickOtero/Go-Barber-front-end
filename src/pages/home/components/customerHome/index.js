import './styles.css'
import HomeCalendar from '../../components/calendar'
import BarbersList from '../../components/barbersList'
import { useEffect, useState } from 'react'
import useDateHelpers from '../../hooks/generalResources/useDateHelpers'
import { useNavigate } from 'react-router-dom'
import scissors from "../../assets/scissors.svg"
import skull from "../../assets/skull.svg"
import useReserveContext from '../../../../hooks/reserves/useReserveContext'
import AppointmentList from './components/appointmentList'

const CustomerHome = () => {
  const [barberSelected, setBarberSelected] = useState(false)
  const [barberName, setBarberName] = useState("")
  const [reserve_date, setReserve_date] = useState();
  const [reserve_hour, setReserve_hour] = useState("");
  const [cardSelected, setCardSelected] = useState(0);

  const {weekDay, month, appointmentHours} = useDateHelpers();

  const navigate = useNavigate();

  const {
    handleCustomerReservesList,
    handleCreateReserve,
    handleEditReserves,
    reserveBarberId,
    reserveMessages,
    setAppointment,
    setReserveMessages,
    setReserveSuccessMessage,
    reserveSuccessMessage,
    deleteReserveModal,
    setDeleteReserveModal,
    reserveId,
    handleDeleteReserve,
    reserveListAltered,
    setEditingReserve,
    editingReserve,
  } = useReserveContext()

  useEffect(() => {
    const reserveDate = new Date(reserve_date);

    const appointmentMessage = `${weekDay[reserveDate.getDay()]}, dia ${reserveDate.getDate()} de ${month[reserveDate.getMonth()]} de ${reserveDate.getFullYear()} às ${reserve_hour}h com ${barberName}`
  
    setAppointment(appointmentMessage);
  }, [reserve_date, reserve_hour])

  useEffect(() => {
    setReserveSuccessMessage("")
    setReserveMessages('')
    setEditingReserve(false);
  }, [])

  useEffect(() => {
    if (reserveSuccessMessage.length) {
      navigate("/successPage");
    }
  }, [reserveSuccessMessage])

  useEffect(() => {
    const handleLoadReservesList = async () => {
      await handleCustomerReservesList()
    }

    handleLoadReservesList()
  }, [reserveListAltered])

  const handleGetCurrentDateFromCalendar = (currentDate) => {
    setReserve_date(currentDate);
  }

  const hour = reserve_hour.split(":")[0];
  const minutes = reserve_hour.split(":")[1];

  const currentDate = new Date()
  const appointmentDate = new Date(reserve_date)

  const selectedHourEmpty = !reserve_hour.length;
  const isInWorkHours = Number(hour) < 8 || Number(hour) > 20
  const isAppointmentInThePast = (appointmentDate.getDate() < currentDate.getDate() && appointmentDate.getMonth() === currentDate.getMonth()) || (appointmentDate.getDate() < currentDate.getDate() && appointmentDate.getMonth() < currentDate.getMonth()) || (appointmentDate.getDate() === currentDate.getDate() && Number(hour) < currentDate.getHours()) || (appointmentDate.getDate() === currentDate.getDate() && Number(hour) === currentDate.getHours() && Number(minutes) < currentDate.getMinutes());

  return (
    <div className="CustomerHome">
      {reserveMessages && <b className="customer-home-reserve-messages">{reserveMessages}</b>}
      { deleteReserveModal && <div className='delete-reserve-backdrop'>
              <div className='delete-reserve-modal'>
                <b>Tem certeza que deseja<br/> excluir este agendamento?</b>
                <div className='delete-reserve-modal-buttons'>
                  <button className="home-button"onClick={() => {
                    handleDeleteReserve(reserveId)
                    setDeleteReserveModal(false);
                    }}type='button'>Sim</button>
                  <button className="home-button"onClick={() => setDeleteReserveModal(false)}type='button'>Não</button>
                </div>
            </div>
        </div>
        }
        {!barberSelected && (
        <div className="customer-lists-container">
          <div className="customer-list customer-appointmentList-main">
           
          <h1>Lista de agendamentos</h1>
            <AppointmentList setBarberSelected={setBarberSelected} setBarberName={setBarberName} barberName={barberName} setEditingReserve={setEditingReserve}/>
            </div>
            <div className="customer-list customer-barberList-main">
            <h1>
              Escolha um barbeiro e agende seu corte
            </h1>
            <BarbersList setBarberSelected={setBarberSelected} setBarberName={setBarberName}/>
          </div>
        </div>
        )}
        {barberSelected && (
          <main>
            <section className='info-section-container'>
            <div className="customer-home-info-section">
            <div className="barber-icon-container">
                <img src={skull} alt="Tesoura"/>
                <img src={scissors} alt="Crânio"/>
              </div>
              <div className='customer-home-info-panel'>
                <h1>Informações importantes</h1>
                <ul>
                  <li>Agendamentos anteriores à data atual não são permitidos</li>
                  <li>Estamos disponíveis das 08:00 às 20:00</li>
                  <li>Os agendamentos são feitos com intervalos de 30 minutos</li>
                  <li>Nosso horário de almoço é de 11:00h às 12:00h</li>
                </ul>
              </div>
            </div>
            <button className='home-button' onClick={() => {
              setEditingReserve(false);
              setBarberSelected(false)
              }} type='button'>Retornar</button>
            </section>
            <section className='appointment-hour-section'>
              <h1>
                {editingReserve ? "Escolha uma nova data para efetuar a alteração" : "Escolha uma data de agendamento"} <br />
              </h1>

              <div className='section-cards'>
            { appointmentHours && appointmentHours.map(hour => {
                return (
                <div key={hour.id} className={cardSelected === hour.id ? "hour-card-selected" : 'hour-card'}>
                  <b onClick={() => {
                    setReserve_hour(hour.hour)
                    setCardSelected(hour.id)
                  }
                    }>{hour.hour}</b>
                </div>
                )
                })
            }
              </div>
            </section>
            <section className='customer-calendar-section'>
              <div className="customer-calendar-home">
                <HomeCalendar getDate={handleGetCurrentDateFromCalendar}/>
              </div>
              <button disabled={selectedHourEmpty || isInWorkHours || isAppointmentInThePast}
              onClick={() => {
                if (!editingReserve) {
                  handleCreateReserve(reserve_date, reserve_hour, reserveBarberId)
                  return
                } 

                if (editingReserve) {
                  handleEditReserves(reserve_date, reserve_hour, reserveId)
                  return
                }
              }
              }
              className="home-button schedule-button"
              type="button"
              >
              {editingReserve ? "Editar agendamento" : "Agendar corte"}
              </button>
            </section>
          </main>
      )}
    </div>
  )
}

export default CustomerHome
