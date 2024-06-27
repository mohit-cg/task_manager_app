import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import styles from "./createTask.module.css";
import axios from "axios";
import { formatDate, formatDate2 } from "../../utitlity";
function CreateTaskForm({
  type = "Add",
  setTaskAdded,
  data,
  taskAdded,
  setOpen,
}) {
  const [formValues, setFormValues] = useState({ status: "incomplete" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (data) {
      setFormValues(data);
    }
  }, []);
  const handleChange = (name, value) => {
    console.log(value);
    setFormValues({ ...formValues, [name]: value });
  };

  const AddTask = async () => {
    if (
      formValues?.title &&
      formValues?.description &&
      formValues?.status &&
      formValues?.dueDate
    ) {
      try {
        setLoading(true);
        setError("");
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BACKEND_URL}/tasks/createTask`,
          data: formValues,
        })
          .then((response) => {
            setLoading(false);
            setTaskAdded(!taskAdded);
            setOpen(false);
          })
          .catch((err) => {
            setError("Some Error Occurred");
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("All fields are required !");
    }
  };

  const EditTask = async () => {
    try {
      setLoading(true);
      axios({
        method: "put",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/editTask/${data?._id}`,
        data: formValues,
      })
        .then((response) => {
          setLoading(false);
          setTaskAdded(!taskAdded);
          setOpen(false);
        })
        .catch((err) => {
          setError("Some Error Occurred");
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal customCardClass={styles.customCardClass} setOpen={setOpen}>
      <div className={styles.createTaskFormHeader}>
        {type === "Add" ? "Add Task" : "Edit Task"}
      </div>
      <div className={styles.form}>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control"
            id="title"
            value={formValues?.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            value={formValues?.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <div className="form-label">Status</div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="status"
              id="status1"
              value="incomplete"
              checked={formValues?.status === "incomplete"}
              onChange={(e) => handleChange("status", e.target.value)}
            />
            <label class="form-check-label" for="status1">
              InComplete
            </label>
          </div>
        </div>
        <div className="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="status"
              id="status2"
              value="complete"
              checked={formValues?.status === "complete"}
              onChange={(e) => handleChange("status", e.target.value)}
            />
            <label class="form-check-label" for="status2">
              Complete
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label for="dueDate" class="form-label">
            Description
          </label>
          <input
            class="form-control"
            type="date"
            name="dueDate"
            id="dueDate"
            value={formatDate2(formValues?.dueDate)}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </div>
        <div className="mb-3">
          {type === "Add" ? (
            <button
              className="btn btn-primary"
              onClick={() => AddTask()}
              disabled={loading}
            >
              Add Task
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => EditTask()}
              disabled={loading}
            >
              Edit Task
            </button>
          )}
        </div>
        {error ? (
          <div style={{ color: "red", fontSize: "14px" }}>{error}</div>
        ) : null}
      </div>
    </Modal>
  );
}

export default CreateTaskForm;
