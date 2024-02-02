import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  onOverlayClick: () => void
}
export const ModalOverlay: React.FunctionComponent<ModalOverlayProps> = ({children, onOverlayClick}) => {
  return (
    <div className={styles.modalOverlay}
         onClick={(event) => {
           if (event.target === event.currentTarget) {
             onOverlayClick();
           }
         }}>
      {children}
    </div>
  );
}