import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../CreateTask/Modal/Modal";
import styles from "./taskview.module.css";
import { formatDate } from "../../utitlity";
function TaskView({ id, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    if (id) {
      getTask();
    }
  }, []);
  const getTask = () => {
    try {
      setLoading(true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/getSingleTask/${id}`,
      })
        .then((response) => {
          setLoading(false);
          setData(response.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal setOpen={setOpen} customCardClass={styles.customCard}>
      <div className={styles.taskHeader}>Task Details</div>
      <div className={styles.taskDetails}>
        <table className={styles.taskTable}>
          <tr>
            <th>Id</th>
            <td>{data?._id}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{data?.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{data?.description}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{data?.status}</td>
          </tr>
          <tr>
            <th>Due Date</th>
            <td>{formatDate(data?.dueDate)}</td>
          </tr>
        </table>
      </div>
    </Modal>
  );
}

export default TaskView;
