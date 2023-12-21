import styles from './modal-overlay.module.css'

function ModalOverlay({children}){
  return(
    <div className={styles.modalOverlay}>
      <h1>sdfs</h1>{children}
    </div>
  )
}
export default ModalOverlay