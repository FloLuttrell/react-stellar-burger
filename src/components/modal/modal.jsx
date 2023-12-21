import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
const reactModal = document.getElementById("react-modal")
function Modal({children, title, handleCloseBtnClick}) {
  return createPortal((
    <ModalOverlay>
      <div className={styles.mainWindow}>
        <div className={`${styles.modalHeader} pt-10`}>
          <p className="text text_type_main-large">{title}</p>
          <div className={styles.closeIcon}><CloseIcon type="primary" onClick={handleCloseBtnClick}/></div>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), reactModal)
}

export default Modal;