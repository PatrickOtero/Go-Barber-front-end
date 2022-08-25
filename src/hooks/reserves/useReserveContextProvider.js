import { useState } from 'react'
import { apiAuth } from '../../services/axios'

const useReserveContextProvider = () => {
  const [nextAttendance, setNextAttendance] = useState([]);
  const [morningReserves, setMorningReserves] = useState([]);
  const [afternoonReserves, setAfternoonReserves] = useState([]);
  const [nightReserves, setNightReserves] = useState([]);
  const [reservesError, setReservesError] = useState('');
  const [calendarDate, setCalendarDate] = useState('');
  const [reservesList, setReservesList] = useState("");
  const [user_email, setUser_email] = useState()
  const [user_password, setUser_password] = useState()

  const [reserveMessages, setReserveMessages] = useState('')
  const [reserveSuccessMessage, setReserveSuccessMessage] = useState('')
  const [reserveBarberId, setReserveBarberId] = useState(0)
  const [reserveId, setReserveId] = useState(0)
  const [deleteReserveModal, setDeleteReserveModal] = useState(false);
  const [reserveListAltered, setReserveListAltered] = useState(false);

  const [appointment, setAppointment] = useState();

  const [editingReserve, setEditingReserve] = useState(false);

  const handleBarberReservesList = async ( date, month) => {
  
    setNextAttendance('')
    setMorningReserves('')
    setAfternoonReserves('')
    setNightReserves("")
    try {
      await apiAuth.get(
        `/barber/reserves/list?currentDate=${date}&currentMonth=${month}`).then(finalResponse => {
  
          const {
            nextAttendance,
            morningReserves,
            afternoonReserves,
            nightReserves
          } = finalResponse.data
  
          if (nextAttendance) {
            setNextAttendance(nextAttendance)
          }
          if (morningReserves.length) {
            setMorningReserves(morningReserves)
          }
          if (afternoonReserves.length) {
            setAfternoonReserves(afternoonReserves)
          }
          if (nightReserves.length) {
            setNightReserves(nightReserves)
          }
  
        })
    } catch (error) {
      setReservesError(error.response.data.error)
    }
  }

  const handleCustomerReservesList = async () => {
    if (reservesList.length === 1) {
      setReservesList("")
    }
  
    try {
      await apiAuth.get(
        `/customer/reserves/list`).then(finalResponse => {
  
          const {
            reservesList,
          } = finalResponse.data
  
          if (reservesList) {
            setReservesList(reservesList);
          }
        })
    } catch (error) {
      setReservesError(error.response.data.error)
    }
  }

  const handleCreateReserve = async (reserveDate, reserve_hour, barberId) => {
    setReserveMessages('')
    setReserveSuccessMessage("")

    const appointmentDate = new Date(reserveDate);

    const year = appointmentDate.getFullYear();
    const months = appointmentDate.getMonth()+1;
    const date = appointmentDate.getDate();
    const hours = reserve_hour.split(":")[0];
    const minutes = reserve_hour.split(":")[1];

      const body = {
        date_day: `${date}`,
        date_month: `${months}`,
        date_year: `${year}`,
        date_hour: `${hours}`,
        date_minutes: `${minutes}`
      }
      
    try {
      await apiAuth.post(
        `/customer/reserves/create/${barberId}`, body
      ).then(finalResponse => {
        setReserveSuccessMessage(finalResponse.data.message)
      })

    } catch (error) {
      setReserveMessages(error.response.data.message)
    }
  }

  const handleDeleteReserve = async (reserveId) => {
    setReserveMessages("");

    try {   
      await apiAuth.delete(`/customer/reserves/${reserveId}`).then(response => {
        setReserveMessages(response.data.message)
        setReserveListAltered(!reserveListAltered);
      })
    } catch (error) {
      setReserveMessages(error.response.data.message)
    }
  }

  const handleEditReserves = async(reserveDate, reserve_hour, reserveId) => {
    setReserveMessages("");

    const appointmentDate = new Date(reserveDate);

    const year = appointmentDate.getFullYear();
    const months = appointmentDate.getMonth()+1;
    const date = appointmentDate.getDate();
    const hours = reserve_hour.split(":")[0];
    const minutes = reserve_hour.split(":")[1];

      const body = {
        date_day: `${date}`,
        date_month: `${months}`,
        date_year: `${year}`,
        date_hour: `${hours}`,
        date_minutes: `${minutes}`
      }

    try {   
      await apiAuth.put(`/customer/reserves/edit/${reserveId}`, body).then(finalResponse => {
        setReserveSuccessMessage(finalResponse.data.message)
      })
      setReserveListAltered(!reserveListAltered);
    } catch (error) {
      setReserveMessages(error.response.data.message)
    }
  }

    return {
      handleBarberReservesList,
      handleCustomerReservesList,
      handleEditReserves,
      nextAttendance,
      setNextAttendance,
      morningReserves,
      setMorningReserves,
      afternoonReserves,
      setAfternoonReserves,
      nightReserves,
      setNightReserves,
      reservesError,
      setReservesError,
      calendarDate,
      setCalendarDate,
      setReservesList,
      reservesList,
      user_email,
      user_password,
      setUser_email,
      setUser_password,
      handleCreateReserve,
      setReserveMessages,
      reserveMessages,
      setReserveSuccessMessage,
      reserveSuccessMessage,
      reserveBarberId,
      setReserveBarberId,
      reserveId,
      setReserveId,
      appointment,
      setAppointment,
      handleDeleteReserve,
      deleteReserveModal,
      setDeleteReserveModal,
      reserveListAltered,
      setReserveListAltered,
      setEditingReserve,
      editingReserve,
    }
}

export default useReserveContextProvider
