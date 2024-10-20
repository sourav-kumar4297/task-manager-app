"use client";
import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getTaskPriorityClasses = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-700 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className={`bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
            {task.title}
          </h3>
          <p className="text-gray-700 mt-1">{task.description}</p>
          <p
            className={`${getTaskPriorityClasses(
              task.priority
            )} w-fit px-3 py-1 mt-2 text-sm rounded-lg`}
          >
            Priority: {task.priority}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="bg-yellow-400 text-white py-1 px-3 rounded-lg shadow-sm hover:bg-yellow-500 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-sm hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`py-1 px-3 rounded-lg ${
              task.completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            } transition duration-200`}
          >
            {task.completed ? "Mark as Pending" : "Mark as Completed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
