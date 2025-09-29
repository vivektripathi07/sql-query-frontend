import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">Natural2SQL</h1>
      <nav className="space-x-6">
        <a href="#" className="hover:text-gray-100 transition-colors">Docs</a>
        <a href="#" className="hover:text-gray-100 transition-colors">Examples</a>
        <a href="#" className="hover:text-gray-100 transition-colors">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
