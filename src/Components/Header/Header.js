import React from "react";
import styles from "./header.module.css";
function Header() {
  return (
    <div className="row">
      <div className={styles.header}>
        <p>Task Managment APP</p>
      </div>
    </div>
  );
}

export default Header;
