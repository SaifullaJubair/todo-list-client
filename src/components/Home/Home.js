import React from "react";

const Home = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      task: event.target.task.value,
    };
    console.log(task);
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
    </div>
  );
};

export default Home;
