import "./styles.css";

const AttendedDiv = ({type, messageSize}) => {
    return (
        <div className="attendance-div-container">
            <div className={type}></div>
            <h2 className={messageSize}>ATENDIDO</h2>
        </div>
    )
}

export default AttendedDiv;