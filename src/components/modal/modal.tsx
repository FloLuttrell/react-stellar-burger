import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from "react-dom";
import {useEffect} from "react";
import {ModalOverlay} from "../modal-overlay/modal-overlay";

const reactModal = document.getElementById("react-modal")

type ModalProps = {
  title: string,
  onClose: () => void
}
export const Modal: React.FunctionComponent<ModalProps> = ({children, title, onClose}) => {
  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    }
  }, []);
  if (!reactModal) {
    return (<i></i>)
  }
  return createPortal((
    <ModalOverlay onOverlayClick={onClose}>
      <div className={styles.mainWindow}>
        <div id="el" tabIndex={1} className={`${styles.modalHeader} pt-10`}>
          <p className="text text_type_main-large">{title}</p>
          <div className={styles.closeIcon}><CloseIcon type="primary" onClick={onClose}/></div>
        </div>
        {children}
      </div>
    </ModalOverlay>
  ), reactModal)
}
