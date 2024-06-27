import React, { useEffect, useState } from "react";
import CreateTask from "../CreateTask/CreateTask";
import SingleTask from "../SingleTask/SingleTask";
import axios from "axios";
import CreateTaskForm from "../CreateTask/CreateTaskForm";

function TaskList() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);
  useEffect(() => {
    getTasks();
  }, [taskAdded]);

  const getTasks = async () => {
    try {
      setLoading(true);
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/getTasks`,
      })
        .then((response) => {
          setLoading(false);
          setTasks(response.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="row">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <CreateTask setOpenCreateTask={setOpenCreateTask} />
        </div>
      </div>
      <div className="row">
        {tasks?.length > 0 &&
          !loading &&
          tasks?.map((task, index) => {
            return (
              <div className="col-md-4 col-sm-12" key={task?._id}>
                <SingleTask
                  data={task}
                  setTaskAdded={setTaskAdded}
                  taskAdded={taskAdded}
                />
              </div>
            );
          })}
        {!loading && tasks?.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize:'30px',
              color:'#fff',
              height:'200px'
            }}
          >
            No Tasks Found !
          </div>
        )}
      </div>
      {openCreateTask && (
        <CreateTaskForm
          setTaskAdded={setTaskAdded}
          taskAdded={taskAdded}
          setOpen={setOpenCreateTask}
        />
      )}
    </div>
  );
}

export default TaskList;
