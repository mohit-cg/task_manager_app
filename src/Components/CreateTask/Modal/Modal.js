import React from "react";
import styles from "./modal.module.css";
import { FaXmark } from "react-icons/fa6";
function Modal({ children, isOpen, setOpen, customCardClass }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={`card ${styles.modalCard} ${customCardClass}`}>
        <div
          className={styles.closeBtn}
          onClick={() => {
            setOpen && setOpen(false);
          }}
        >
          <FaXmark />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
