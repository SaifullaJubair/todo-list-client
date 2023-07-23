import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateTask = ({ task, homeRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleTask, setSingleTask] = useState({});

  const handleUpdateTask = (event) => {
    //handle update
    event.preventDefault();
    const updateTask = {
      task: event.target.task.value,
      completed: false,
    };

    fetch(`https://todo-list-server-gray.vercel.app/task/${singleTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          homeRefresh();
          toast.success("Task Updated Successfully");
          setIsModalOpen(false); // Close the modal after updating the task.
        }
      })
      .catch((error) => {
        // Handle error here
        console.error("Error updating task:", error.message);
      });
  };

  //handle modal
  const handleModalToggle = (task) => {
    setSingleTask(task);
    console.log(task);
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <button
        onClick={() => handleModalToggle(task)}
        className=" mx-2 bg-cyan-400 px-2 py-1 rounded-lg  text-white font-semibold"
      >
        Update
      </button>

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
    </>
  );
};

export default UpdateTask;
