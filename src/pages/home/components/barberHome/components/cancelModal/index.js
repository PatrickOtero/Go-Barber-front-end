import "./styles.css";

const CancelModal = ({ cancelReason, setCancelReason}) => {

    return (
        <div className="cancel-modal-container">
              <div className='cancel-reserve-modal'>
                    <textarea placeholder="Informe seu motivo." value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}/>
            </div>
        </div>
    )
}

export default CancelModal;