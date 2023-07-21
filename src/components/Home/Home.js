import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date().toUTCString();
    const task = {
      task: event.target.task.value,
      time: date,
    };
    fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setRefresh(!refresh);
          toast.success("Task Add Successfully");
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/task")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [refresh]);

  const handleDelete = (tasks) => {
    // console.log(tasks._id);
    fetch(`http://localhost:5000/task/${tasks._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setRefresh(!refresh);
          toast.success("successfully task delete");
        }
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold my-20">Welcome To Todo List</h1>

      <form onSubmit={handleSubmit}>
        <label className="w-1/4 py-2 mx-auto relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <input
            name="task"
            type="text"
            id="text"
            className=" peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Task"
          />

          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs ">
            Task
          </span>
        </label>
        <button className="">Add</button>
      </form>

      <div>
        <h1> Your all task {tasks.length}</h1>

        {tasks.map((task) => (
          <div key={task._id}>
            <div className="w-1/4 mx-auto shadow-xl rounded-md p-4 my-8">
              <div className="">
                <h3>{task?.task}</h3>
                <div className="flex my-4  ">
                  <div className="mx-auto">
                    <button className=" mx-2 bg-cyan-400 px-2 py-1 rounded-lg  text-white font-semibold">
                      Update
                    </button>
                    <button
                      className=" bg-red-600  px-2 py-1 rounded-lg  text-white font-semibold"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                    <button className=" mx-2  px-2 py-1 rounded-lg  bg-green-400  text-white font-semibold">
                      Complete
                    </button>
                  </div>
                </div>
                <p>{task?.time?.slice(0, 16)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
