import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({children, onOverlayClick}){
  return(
    <div className={styles.modalOverlay}
         onClick={(event) => {
           if (event.target === event.currentTarget) {
             onOverlayClick()
           }
         }}>
      {children}
    </div>
  )
}

// ModalOverlay.propTypes = {
// children: PropTypes.any
// }

export default ModalOverlay