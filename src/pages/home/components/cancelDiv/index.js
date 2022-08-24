import "./styles.css";

const CancelDiv = ({type, messageSize, userType, setReasonModal, setCancelReason, cancelReason, barberName, setBarberName, reserveId, setReserveId}) => {
    return (
        <div className="cancel-div-container">
            <div className={type}></div>
            <h2 className={messageSize}>CANCELADO</h2>
            {userType === "customer" && <button onClick={() => {
                setReasonModal(true)
                setCancelReason(cancelReason)
                setBarberName(barberName);
                setReserveId(reserveId);
                }} className="see-reason-button" type="button" >Ver motivo</button>}
        </div>
    )
}

export default CancelDiv;