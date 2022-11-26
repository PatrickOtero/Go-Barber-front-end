import "./styles.css";

const CancelDiv = ({type, messageSize, userType, setReasonModal, setCancelreason, cancelreason, barberName, setBarberName, reserveId, setReserveId}) => {
    return (
        <div className="cancel-div-container">
            <div className={type}></div>
            <h2 className={messageSize}>CANCELADO</h2>
            {userType === "customer" && <button onClick={() => {
                setReasonModal(true)
                setCancelreason(cancelreason)
                setBarberName(barberName);
                setReserveId(reserveId);
                }} className="see-reason-button" type="button" >Ver motivo</button>}
        </div>
    )
}

export default CancelDiv;