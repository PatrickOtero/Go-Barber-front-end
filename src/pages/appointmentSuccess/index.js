import { useNavigate } from "react-router-dom"
import useReserveContext from "../../hooks/reserves/useReserveContext"
import greenCheck from "./assets/check.svg"
import "./styles.css"

const AppointmentSuccessPage = () => {
    const {appointment, setReserveSuccessMessage, reserveSuccessMessage, setReserveMessages, editingReserve} = useReserveContext()

    const navigate = useNavigate()

  return (
    <div className="appointmentSuccessPage">
      <main>
      {reserveSuccessMessage && <b className="appointment-success-messages">{reserveSuccessMessage}</b>}
        <img src={greenCheck} alt="Agendamento feito!"/>
        <h1>{editingReserve ? "Agendamento editado com sucesso" : "Agendamento concluído"}</h1>
        <b>{appointment}</b>
        <button onClick={() => {
          navigate("/home")
          setReserveSuccessMessage("")
          setReserveMessages('')
      }} type="button">Ok</button>
      </main>
    </div>
  )
}

export default AppointmentSuccessPage