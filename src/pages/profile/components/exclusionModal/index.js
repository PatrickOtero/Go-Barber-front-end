import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginContext from "../../../../hooks/loggedUser/useLoginContext";
import useUsersContext from "../../../../hooks/users/useUsersContext";
import "./styles.css";

const ExclusionModal = ({userType, setExclusionModal}) => {

    const { handleUserDelete, setModalUserPassword, modalUserPassword,     setProfileErrors, userDeleted } = useUsersContext();

    const { setToken } = useLoginContext()

    const navigate = useNavigate();

    useEffect(() => {
        if (userDeleted) {
           setToken("")
           navigate("/")
        }
    }, [userDeleted])

    return (
        <div className="exclusion-modal-container">
            <div className="modal-container">
                <div 
                    className="exclusion-password-container">
                    <b className="exclusion-main-text">Tem certeza que deseja fazer isso?</b>
                    <b className="exclusion-smaller-text">Essa ação é irreversível. Para confirmar que é você mesmo fazendo isso, informe sua senha abaixo:</b>
                    <input value={modalUserPassword} placeholder="Insira sua senha" type="password" onChange={(e) => setModalUserPassword(e.target.value)}/>
                </div>
                <div className="exclusion-buttons-container">
                    <button className="exclusion-button exclusion-confirm" type="button" onClick={() => {
                        handleUserDelete(userType)
                        }}>Confirmar exclusão</button>
                    <button className="exclusion-button" type="button" onClick={() => {
                        setProfileErrors("")
                        setExclusionModal(false)
                        }}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ExclusionModal;