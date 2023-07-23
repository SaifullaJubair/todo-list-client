import React from "react";
import Swal from "sweetalert2";

const DeleteTask = ({ task, homeRefresh }) => {
  const handleDelete = (tasks) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this task ${task._id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/task/${task._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              homeRefresh();
              Swal.fire(
                `Deleted! Your task has been delete  successfully ${task._id}`
              );
            }
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to delete task.", "error");
          });
      }
    });
  };
  return (
    <button
      className=" bg-red-600  px-2 py-1 rounded-lg  text-white font-semibold"
      onClick={() => handleDelete(task)}
    >
      Delete
    </button>
  );
};

export default DeleteTask;
