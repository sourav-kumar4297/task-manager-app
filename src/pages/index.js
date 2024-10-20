"use client";
import AddTaskModal from "@/app/components/AddTaskModal";
import EditTaskModal from "@/app/components/EditTaskModal";
import Header from "@/app/components/Header";
import TaskList from "@/app/components/TaskList";
import React, { useState, useEffect } from "react";
import "@/app/globals.css";

const Page = () => {
  const initialTasks = [
    {
      id: 1,
      title: "Sample Task",
      description: "This is a sample task 1",
      priority: "High",
      completed: true,
    },
    {
      id: 2,
      title: "Story no-34353",
      description: "This is a sample task 2",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Story no-76723",
      description: "This is a sample task 3",
      priority: "Low",
      completed: false,
    },
    {
      id: 4,
      title: "Story no-34353",
      description: "This is a sample task 4",
      priority: "Medium",
      completed: true,
    },
    {
      id: 5,
      title: "Story no-767223453",
      description: "This is a sample task 5",
      priority: "Low",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenEditModal = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentTask(null);
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1, completed: false },
    ]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-1 md:p-8">
      <Header onOpenAddModal={handleOpenAddModal} />
      <main>
        <TaskList
          tasks={tasks}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
          onToggleComplete={toggleComplete}
        />
      </main>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={addTask}
      />
      {currentTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          task={currentTask}
          onClose={handleCloseEditModal}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
};

export default Page;
