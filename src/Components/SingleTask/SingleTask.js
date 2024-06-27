import React, { useState } from "react";
import styles from "./task.module.css";
import { formatDate } from "../../utitlity";
import { FaCalendar, FaEdit, FaExpand, FaTrash } from "react-icons/fa";
import CreateTaskForm from "../CreateTask/CreateTaskForm";
import axios from "axios";
import TaskView from "../TaskView/TaskView";
function SingleTask({ data, taskAdded, setTaskAdded }) {
  const [openEditTask, setOpenEditTask] = useState(false);
  const [opentask, setOpenTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteTask = async () => {
    try {
      setLoading(true);
      axios({
        method: "delete",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/deleteTask/${data?._id}`,
      })
        .then((response) => {
          setLoading(false);
          setTaskAdded(!taskAdded);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={`card ${styles.customCard}`}>
      <div className="row">
        <div className={styles.taskTitle}>{data?.title || "Sample Title"}</div>
        <div className={styles.taskdescription}>
          {data?.description || "Sample Description"}
        </div>
        <div className={styles.taskDueDate}>
          <span>
            <FaCalendar /> : &nbsp;
          </span>
          {formatDate(data?.dueDate)}
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            className={`btn ${
              data?.status === "incomplete" ? "btn-success" : "btn-warning"
            }`}
            style={{ fontWeight: 550, textTransform: "capitalize" }}
          >
            {data?.status}
          </button>
        </div>
        <div className="col-6">
          <div className={styles.iconContainer}>
            <button
              className={styles.actionBtn}
              onClick={() => setOpenTask(true)}
            >
              <FaExpand />
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => setOpenEditTask(true)}
            >
              <FaEdit />
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => deleteTask()}
              disabled={loading}
            >
              {<FaTrash />}
            </button>
          </div>
        </div>
      </div>
      {openEditTask && (
        <CreateTaskForm
          type={"Edit"}
          data={data}
          setTaskAdded={setTaskAdded}
          taskAdded={taskAdded}
          setOpen={setOpenEditTask}
        />
      )}
      {opentask && <TaskView id={data?._id} setOpen={setOpenTask} />}
    </div>
  );
}

export default SingleTask;
