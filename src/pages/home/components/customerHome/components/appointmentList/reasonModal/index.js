import useReserveContext from "../../../../../../../hooks/reserves/useReserveContext";
import "./styles.css";

const ReasonModal = ({setReasonModal, cancelReason, barberName}) => {

    const {
        handleDeleteReserve,
        reserveId,
      } = useReserveContext()

    return (
        <div className="reason-modal-container">
              <div className='reason-reserve-modal'>
                <b className="reasonTitle">{barberName}:</b>
                <div className="reason-container">
                    <b className="reasonContent">{cancelReason}</b>
                </div>
                <div className="reason-buttons-container">
                  <button className="reason-modal-button" onClick={() => {
                      setReasonModal(false)
                    }}type='button'>Voltar</button>
                    <button className="reason-modal-button" onClick={() => {
                      handleDeleteReserve(reserveId)
                      setReasonModal(false)
                    }}type='button'>Deletar agendamento</button>
                </div>
            </div>
        </div>
    )
}

export default ReasonModal;