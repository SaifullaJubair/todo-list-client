import React from "react";
import { toast } from "react-hot-toast";

const AddTask = ({ homeRefresh }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date().toUTCString();
    const newTask = {
      task: event.target.task.value,
      time: date,
    };
    fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task Add Successfully");
          event.target.reset();
          homeRefresh(); // Call the callback function to trigger task refresh in parent component
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center mt-4"
    >
      <div className="relative flex items-center">
        <input
          name="task"
          type="text"
          id="text"
          className="peer h-12 w-96 border border-gray-300 rounded-l-lg px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Task"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r-lg font-semibold hover:bg-blue-600 px-6 py-3 focus:outline-none transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTask;
