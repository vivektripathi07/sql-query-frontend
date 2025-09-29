import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white py-6 px-8 border-t shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <span className="mb-2 md:mb-0">
          © {new Date().getFullYear()} Natural2SQL. All rights reserved.
        </span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
          <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
          <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
