import React from "react";
import styles from "./createTask.module.css";
import { FaPlus } from "react-icons/fa";
function CreateTask({ setOpenCreateTask }) {
  return (
    <div
      className={`card ${styles.customCard}`}
      onClick={() => setOpenCreateTask(true)}
    >
      <div className={styles.addBtn}>
        <FaPlus />
      </div>
      <div className={styles.addTaskText}>Add Task</div>
    </div>
  );
}

export default CreateTask;
