import React, { useEffect, useState } from "react";
import AddTask from "../AddTask/AddTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import UpdateTask from "../UpdateTask/UpdateTask";
import Loader from "react-loading";
import { toast } from "react-hot-toast";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle the theme
  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };

  // // Set the theme when the component mounts
  // useEffect(() => {
  //   document.body.classList.toggle("dark", isDarkTheme);
  // }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  // useEffect(() => {
  //   document.body.classList.toggle(isDarkTheme);
  // }, []);

  useEffect(() => {
    fetch("http://localhost:5000/task")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false); // If there's an error, still set isLoading to false
        console.error("Error fetching tasks:", error);
      });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  // ... existing code ...
  const handleCompleteTask = (task, completed) => {
    const updatedTask = {
      ...task,
      completed: !completed,
    };
    fetch(`http://localhost:5000/task/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setRefresh(!refresh);
          toast.success("Task status updated successfully");
        }
      });
    // console.log(updatedTask);
  };

  return (
    <div
      className={` ${
        isDarkTheme ? "dark:bg-gray-800 text-yellow-500" : "bg-white text-black"
      }`}
    >
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isDarkTheme ? "Day Mode" : "Night Mode"}
        </button>
      </div>
      <h1 className="text-4xl font-semibold py-20 ">
        <span className="bg-white p-4">Welcome To Todo List</span>
      </h1>

      {/* // Add Task */}
      <AddTask homeRefresh={handleRefresh} />

      <div>
        <h1 className="text-2xl font-semibold my-4">
          Your all task {tasks.length}
        </h1>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader type="spin" color="#000" height={100} width={100} />
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id}>
                <div
                  className={`w-1/4 mx-auto shadow-xl rounded-md p-4 my-8 max-w-card ${
                    task.completed ? "bg-green-200" : "bg-white"
                  } `}
                >
                  <div>
                    {task.completed ? (
                      <h3 className="break-words">
                        {" "}
                        <del>{task?.task}</del>{" "}
                      </h3>
                    ) : (
                      <h3 className="break-words"> {task?.task}</h3>
                    )}
                    <div className="flex my-4  ">
                      <div className="mx-auto">
                        {/* update task component */}
                        <UpdateTask
                          task={task}
                          homeRefresh={() => setRefresh(!refresh)}
                        />
                        {/* Delete Task here  */}
                        <DeleteTask task={task} homeRefresh={handleRefresh} />
                        <button
                          className="mx-2 px-2 py-1 rounded-lg bg-green-400 text-white font-semibold"
                          onClick={() =>
                            handleCompleteTask(task, task?.completed)
                          }
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>
                      </div>
                    </div>
                    <p>{task?.time?.slice(0, 16)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      </div>
    </div>
  );
};

export default Home;
