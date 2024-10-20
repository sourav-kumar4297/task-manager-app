"use client";
import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [filter, setFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const sortedPendingTasks = pendingTasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const sortedCompletedTasks = completedTasks.sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchedPendingTasks = sortedPendingTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchedCompletedTasks = sortedCompletedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
      <div className="font-semibold mb-4 text-gray-800 flex justify-between items-center">
        <h2 className="text-3xl">Tasks</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-2 mr-3"
          />
          <p>Filter tasks by priority:</p>
          <select value={filter} onChange={handleFilterChange} className="ml-3">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={toggleShowCompleted}
            className={`ml-4 py-2 px-4 rounded-lg transition duration-200 ${
              showCompleted ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            {showCompleted ? "Show Pending Tasks" : "Show Completed Tasks"}
          </button>
        </div>
      </div>
      {searchedPendingTasks.length === 0 && searchedCompletedTasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Display pending tasks */}
          {!showCompleted && searchedPendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
          {/* Display completed tasks only when toggled */}
          {showCompleted && searchedCompletedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
          {/* Always show completed tasks at the bottom if in default mode */}
          {!showCompleted && searchedCompletedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
