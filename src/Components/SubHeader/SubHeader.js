import React from "react";
import styles from "./subheader.module.css";
function SubHeader() {
  return (
    <div className="row ">
      <div className="col-10">
        <div className={styles.subHeading}>
          <p>All Tasks</p>
        </div>
      </div>
    </div>
  );
}

export default SubHeader;
