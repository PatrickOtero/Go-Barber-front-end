import './styles.css'
import userIcon from '../../assets/userIcon.png'
import clockIcon from '../../assets/clockIcon.svg'
import HomeCalendar from '../../components/calendar'
import { useEffect, useState } from 'react'
import useDateHelpers from '../../hooks/generalResources/useDateHelpers'
import useReserveContext from '../../../../hooks/reserves/useReserveContext'
import CancelModal from './components/cancelModal'
import CancelDiv from '../cancelDiv'
import { apiAuth } from "../../../../services/axios";

const BarberHome = () => {
  const [date] = useState(new Date().getDate())
  const [day] = useState(new Date().getDay())
  const [calendarCurrentDate, setCalendarCurrentDate] = useState()
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelMessages, setCancelMessages] = useState("");
  const [appointmentId, setAppointmentId] = useState(0);
  const [reasonModal, setReasonModal] = useState(false);
  const [newCanceledReserve, setNewCanceledReserve] = useState(false);

  const {
    nextAttendance,
    morningReserves,
    afternoonReserves,
    nightReserves,
    handleBarberReservesList,
  } = useReserveContext()

  const { weekDay } = useDateHelpers()

  const handleGetCurrentDateFromCalendar = (currentDate) => {
    setCalendarCurrentDate(currentDate)
  }

  useEffect(() => {
    const handleLoadReservesList = async () => {
      await handleBarberReservesList(
        new Date(calendarCurrentDate).getDate(),
        new Date(calendarCurrentDate).getMonth(),
      )
    }

    handleLoadReservesList()
  }, [calendarCurrentDate, newCanceledReserve])

  const handleCancelAppointment = async () => {
    setCancelMessages("");

    const body = {
        cancelReason
    }

    try {
        await apiAuth.post(
          `/barber/reserves/cancel/${appointmentId}`, body).then(finalResponse => {
                setCancelMessages(finalResponse.data.message);
                setCancelModal(false);
                setNewCanceledReserve(!newCanceledReserve);
          })
      } catch (error) {
        setCancelMessages(error.response.data.message);
        setCancelModal(false);
      }
}

  return (
    <div className="BarberHome">
      <main className="barber-main">
        <div className="home-date-info">
          <h1>Horários Agendados</h1>
          <div className="home-date">
            <b>Hoje</b>
            <b>|</b>
            <b>Dia {date}</b>
            <b>|</b>
            <b>{weekDay[day]}</b>
          </div>
        </div>

        <div className="following-attendance-container">
          <b className="attendance-home-title">Atendimento a seguir</b>
          { nextAttendance && <b className='nextAttendance-date'>Data: {new Date(nextAttendance.reserve_date).getDate()}/{new Date(nextAttendance.reserve_date).getMonth()+1}</b>}
          {nextAttendance && (
            <div className="attendance-container">
                {nextAttendance.canceled && <CancelDiv type="bigger-div" messageSize="bigger-message" setReasonModal={setReasonModal}/>}
                <div onClick={() => {
                  setAppointmentId(nextAttendance.id);
                }}className="attendance-main">
                  <div className="attendance-border"></div>
                    <img src={userIcon} alt="foto do cliente" />
                    <b>{nextAttendance.customer_name}</b>
                    <div className="attendance-hour">
                      <img src={clockIcon} alt="icone de relógio" />
                      <span className="clock-time">
                      {nextAttendance.reserveCompleteHours}
                  </span>
                </div>
              </div>
            </div>
          )}
          {!nextAttendance && (
            <h1 className="home-reserve-warnings">
              Nâo há um próximo agendamento para exibir
            </h1>
          )}
          <div className="home-date-info">
            <h1>Horários da data selecionada:</h1>
            <div className="home-date">
              <b>Dia {new Date(calendarCurrentDate).getDate()}</b>
              <b>|</b>
              <b>{weekDay[new Date(calendarCurrentDate).getDay()]}</b>
            </div>
          </div>
          <b className="attendance-home-title">Manhã</b>
          <div className="home-secondary-title-border"></div>
          <div className="home-attendance-lists">
            {morningReserves.length > 0 &&
              morningReserves.map((attendance) => {
                return (
                  <div
                    key={attendance.id}
                    className="attendance-container secondary"
                  >

                    <div className="attendance-hour">
                      <img src={clockIcon} alt="icone de relógio" />
                      <span className="clock-time-outside">
                        {attendance.reserveCompleteHours}
                      </span>
                    </div>
                    <div className="attendance-main secondary">
                      {appointmentId === attendance.id && cancelModal && <CancelModal cancelReason={cancelReason} setCancelReason={setCancelReason}/>}
                    {attendance.canceled && <CancelDiv type="smaller-div" messageSize="smaller-message" setReasonModal={setReasonModal}/>}
                      <img src={userIcon} alt="foto do cliente" />
                      <b>{attendance.customer_name}</b>
                    </div>
                    { (appointmentId !== attendance.id || !cancelModal) && <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      setCancelModal(true)
                      setAppointmentId(attendance.id);
                      }}type='button'>Cancelar Agendamento</button>}
                    { appointmentId === attendance.id && cancelModal &&
                     <div className="cancel-reserve-buttons">
                     <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      handleCancelAppointment()
                      }}type='button'>Finalizar</button>
                      <button disabled={attendance.canceled}className="options-button" onClick={() => {
                        setCancelModal(false)
                        }}type='button'>Sair</button>
                        </div>
                        }
                  </div>
                )
              })}
            {!morningReserves.length && (
              <h1 className="home-reserve-warnings">
                Não há agendamento pela manhã
              </h1>
            )}
          </div>

          <b className="attendance-home-title">Tarde</b>
          <div className="home-secondary-title-border"></div>
          <div className="home-attendance-lists">
            {afternoonReserves.length > 0 &&
              afternoonReserves.map((attendance) => {
                return (
                  <div key={attendance.id} className="attendance-container">
                    <div className="attendance-hour">
                      <img src={clockIcon} alt="icone de relógio" />
                      <span className="clock-time-outside">
                        {attendance.reserveCompleteHours}
                      </span>
                    </div>
                    <div className="attendance-main secondary">
                        {appointmentId === attendance.id && cancelModal && <CancelModal cancelReason={cancelReason} setCancelReason={setCancelReason}/>}
                       {attendance.canceled && <CancelDiv type="smaller-div" messageSize="smaller-message" setReasonModal={setReasonModal}/>}
                      <img src={userIcon} alt="foto do cliente" />
                      <b>{attendance.customer_name}</b>
                    </div>
                    { (appointmentId !== attendance.id || !cancelModal) && <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      setCancelModal(true)
                      setAppointmentId(attendance.id);
                      }}type='button'>Cancelar Agendamento</button>}
                    { appointmentId === attendance.id && cancelModal && 
                    <div className="cancel-reserve-buttons">
                     <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      handleCancelAppointment()
                      }}type='button'>Finalizar</button>
                      <button disabled={attendance.canceled}className="options-button" onClick={() => {
                        setCancelModal(false)
                        }}type='button'>Sair</button>
                        </div>
                        }
                  </div>
                )
              })}
            {!afternoonReserves.length && (
              <h1 className="home-reserve-warnings">
                Não há agendamento à tarde
              </h1>
            )}
          </div>
        </div>
        <b className="attendance-home-title">Noite</b>
          <div className="home-secondary-title-border"></div>
          <div className="home-attendance-lists">
            {nightReserves.length > 0 &&
              nightReserves.map((attendance) => {
                return (
                  <div key={attendance.id} className="attendance-container">
                    <div className="attendance-hour">
                      <img src={clockIcon} alt="icone de relógio" />
                      <span className="clock-time-outside">
                        {attendance.reserveCompleteHours}
                      </span>
                    </div>
                    <div onClick={() => {
                      setAppointmentId(attendance.id);
                    }} className="attendance-main secondary">
                       {appointmentId === attendance.id && cancelModal && <CancelModal cancelReason={cancelReason} setCancelReason={setCancelReason}/>}
                      {attendance.canceled && <CancelDiv type="smaller-div" messageSize="smaller-message" setReasonModal={setReasonModal}/>}
                      <img src={userIcon} alt="foto do cliente" />
                      <b>{attendance.customer_name}</b>
                    </div>
                    { (appointmentId !== attendance.id || !cancelModal) && <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      setCancelModal(true)
                      setAppointmentId(attendance.id);
                      }}type='button'>Cancelar Agendamento</button>}
                    { appointmentId === attendance.id && cancelModal && 
                    <div className="cancel-reserve-buttons">
                     <button disabled={attendance.canceled}className="options-button" onClick={() => {
                      handleCancelAppointment()
                      }}type='button'>Finalizar</button>
                      <button disabled={attendance.canceled}className="options-button" onClick={() => {
                        setCancelModal(false)
                        }}type='button'>Sair</button>
                        </div>
                        }
                  </div>
                )
              })}
            {!nightReserves.length && (
              <h1 className="home-reserve-warnings">
                Não há agendamento à noite
              </h1>
            )}
          </div>
      </main>
      <aside>
        <HomeCalendar getDate={handleGetCurrentDateFromCalendar} />
        {cancelMessages && <b className='barber-cancel-messages'>{cancelMessages}</b>}
      </aside>
    </div>
  )
}

export default BarberHome
