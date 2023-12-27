import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
const reactModal = document.getElementById("react-modal")
function Modal({children, title, handleCloseBtnClick}) {
  useEffect(() => {
    const handler = (ev) => {
      if (ev.key === "Escape") {
        handleCloseBtnClick();
      }
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    }
  }, []);
  return createPortal((
    <ModalOverlay onOverlayClick={handleCloseBtnClick}>
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
Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  handleCloseBtnClick: PropTypes.func.isRequired
}


export default Modal;