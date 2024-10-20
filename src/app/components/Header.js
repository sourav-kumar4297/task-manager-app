"use client";
import React from 'react';

const Header = ({ onOpenAddModal }) => {
  return (
    <header className="bg-blue-600 p-4 md:p-6 rounded-b-xl shadow-lg text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
        Smart Task Manager App
      </h1>

      <button
        onClick={onOpenAddModal}
        className="w-full md:w-auto bg-green-500 text-white py-2 px-4 md:px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        Add Task
      </button>
    </header>
  );
};

export default Header;
