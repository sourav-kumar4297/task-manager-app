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
      title: "Complete Project Report",
      description: "Prepare and submit the final project report for the team meeting.",
      priority: "High",
      completed: true,
    },
    {
      id: 2,
      title: "Buy Groceries",
      description: "Purchase vegetables, fruits, milk, and bread for the week.",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      title: "Schedule Doctor’s Appointment",
      description: "Book an appointment with the dentist for a routine check-up.",
      priority: "Low",
      completed: false,
    },
    {
      id: 4,
      title: "Fix Website Bug #12345",
      description: "Resolve the login issue affecting certain users on the platform.",
      priority: "High",
      completed: true,
    },
    {
      id: 5,
      title: "Plan Birthday Party",
      description: "Create a checklist for the party, including invitations and decorations.",
      priority: "Medium",
      completed: false,
    },
    {
      id: 6,
      title: "Water the Plants",
      description: "Water all indoor and outdoor plants before 8 AM.",
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
