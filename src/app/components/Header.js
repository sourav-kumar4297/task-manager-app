"use client"
import React from 'react';

const Header = ({ onOpenAddModal }) => {
  return (
    <header className="bg-blue-600 p-6 rounded-b-xl shadow-lg text-white">
      <h1 className="text-4xl font-bold">Smart Task Manager</h1>
      <button
        onClick={onOpenAddModal}
        className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        Add Task
      </button>
    </header>
  );
};

export default Header;
