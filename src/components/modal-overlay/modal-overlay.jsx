import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({children}){
  return(
    <div className={styles.modalOverlay}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
children: PropTypes.any
}

export default ModalOverlay