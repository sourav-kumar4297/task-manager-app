"use client";
import React from "react";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getTaskPriorityClasses = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-700 text-white";
      case "Medium":
        return "bg-yellow-400";
      case "Low":
        return "bg-green-500 text-white";
    }
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${task.completed ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-900">{task.title}</h3>
          <p className="text-gray-700 mt-1">{task.description}</p>
          <p className={`${getTaskPriorityClasses(task.priority)} w-min px-3 py-2 mt-1 rounded-lg`}>
            Priority: {task.priority}
          </p>
        </div>
        <div className="flex space-x-2 mt-2">
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
            className={`py-1 px-3 rounded-lg ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
