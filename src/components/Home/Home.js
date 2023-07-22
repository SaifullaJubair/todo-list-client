import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AddTask from "../AddTask/AddTask";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Set the theme when the component mounts
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);
  useEffect(() => {
    fetch("http://localhost:5000/task")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = (tasks) => {
    const agree = window.confirm("Are you sure to delete this task?");
    // console.log(tasks._id);
    if (agree) {
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
    }
  };

  //handle modal
  const handleModalToggle = (task) => {
    setSingleTask(task);
    console.log(task);
    setIsModalOpen(!isModalOpen);
  };

  const handleUpdateTask = (event) => {
    //handle update
    event.preventDefault();
    const updateTask = {
      task: event.target.task.value,
    };

    fetch(`http://localhost:5000/task/${singleTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setRefresh(!refresh);
          toast.success("Task Updated Successfully");
          setIsModalOpen(false); // Close the modal after updating the task.
        }
      })
      .catch((error) => {
        // Handle error here
        console.error("Error updating task:", error.message);
      });
  };

  return (
    <div
      className={`h-screen ${
        isDarkTheme ? "dark:bg-gray-800 dark:text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-semibold py-20">Welcome To Todo List</h1>
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isDarkTheme ? "Day Mode" : "Night Mode"}
        </button>
      </div>

      {/* // Add Task */}
      <AddTask homeRefresh={handleRefresh} />

      <div>
        <h1 className="text-2xl font-semibold my-4">
          Your all task {tasks.length}
        </h1>

        {tasks.map((task) => (
          <div key={task._id}>
            <div className="w-1/4 mx-auto shadow-xl rounded-md p-4 my-8  max-w-card">
              <div>
                <h3 className="break-words"> {task?.task}</h3>
                <div className="flex my-4  ">
                  <div className="mx-auto">
                    <button
                      onClick={() => handleModalToggle(task)}
                      className=" mx-2 bg-cyan-400 px-2 py-1 rounded-lg  text-white font-semibold"
                    >
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

        {/* modal */}
        {isModalOpen && (
          <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
            <div className="bg-white p-6 rounded shadow-md">
              <h1 className="text-xl font-bold mb-4">model here</h1>
              <form onSubmit={handleUpdateTask}>
                <label className="w-96 py-2 mx-auto relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <textarea
                    name="task"
                    type="text"
                    id="text"
                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-black"
                    placeholder="Task"
                    defaultValue={singleTask.task}
                  />

                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs ">
                    Task
                  </span>
                </label>
                <button className="bg-green-500 text-white m-2  px-4 py-2 rounded">
                  Save
                </button>
                <button
                  onClick={handleModalToggle}
                  className="bg-blue-500 text-white my-4 px-4 py-2 rounded"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
