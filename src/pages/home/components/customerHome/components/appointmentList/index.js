import './styles.css'
import userIcon from '../../../../assets/userIcon.png'
import calendarIcon from '../../../../assets/calendarIcon.svg'
import { useEffect, useState } from 'react'
import useReserveContext from '../../../../../../hooks/reserves/useReserveContext'
import CancelDiv from '../../../cancelDiv'
import ReasonModal from './reasonModal'

const AppointmentList = ({ setBarberSelected, setBarberName, barberName, setEditingReserve }) => {
  const [reasonModal, setReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const {
    setReservesList,
    reservesList,
    reservesError,
    handleCustomerReservesList,
    setReserveId,
    reserveId,
    setDeleteReserveModal
  } = useReserveContext()

  useEffect(() => {
    setReservesList("");
    const handleLoadreservesList = async () => {
        await handleCustomerReservesList()
    }

    handleLoadreservesList()
  }, [])

  return (
    <div className="AppointmentList">
      {reasonModal && <ReasonModal setReasonModal={setReasonModal} cancelreason={cancelreason} barberName={barberName} reserveId={reserveId}/>}
        {!reservesList.length && <h2 className='customer-reserveList-empty'>Você ainda não agendou nenhum corte</h2>}
      {reservesList.length > 0 &&
        !reservesError &&
        reservesList.map((reserve) => {
          return (
            <div
            key={reserve.id}
            className="reserve-list-container"
          >
                <div className="reserve-and-button-container">
                    <div className="reserve-list-main">
                    {reserve.canceled && <CancelDiv type="smallest-div" messageSize="smallest-message" userType="customer" setReasonModal={setReasonModal} setCancelreason={setCancelreason} cancelreason={reserve.cancelreason} barberName={reserve.barber_name} setBarberName={setBarberName} reserveId={reserve.id} setReserveId={setReserveId}/>}
                        <div className="reserve-list-border"></div>
                    <img src={userIcon} alt="foto do cliente" />
                        <div className="reserve-list-info">
                            <b>{reserve.barber_name}</b>
                            <div className="reserve-list-date-container">
                                <div className="reserve-list-date day">
                                    <img src={calendarIcon} alt="icone de relógio" />
                                    <span className="list-clock-time">{reserve.reserve_date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='reserve-list-button delete' onClick={() => {
                        setReserveId(reserve.id)
                        setDeleteReserveModal(true)}
                        }type='button'>Deletar</button>
                        <button disabled={reserve.canceled}className='reserve-list-button edit' onClick={() => {
                        setEditingReserve(true);
                        setReserveId(reserve.id)
                        setBarberSelected(true)
                        setBarberName(reserve.barber_name)}
                        }type='button'>Editar</button>
                </div>
            </div>
          )
        })}
      {!reservesList.length && reservesError && <h1>{reservesError}</h1>}
    </div>
  )
}

export default AppointmentList