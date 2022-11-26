import "./styles.css";

const CancelModal = ({ cancelreason, setCancelreason}) => {

    return (
        <div className="cancel-modal-container">
              <div className='cancel-reserve-modal'>
                    <textarea placeholder="Informe seu motivo." value={cancelreason} onChange={(e) => setCancelreason(e.target.value)}/>
            </div>
        </div>
    )
}

export default CancelModal;