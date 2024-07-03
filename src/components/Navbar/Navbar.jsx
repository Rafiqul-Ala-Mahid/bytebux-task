import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#182D47] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[#2E9CCE] bg-gray-600 px-2 rounded-lg text-2xl font-bold">
          Byte-Bux
        </div>
        <div className=" lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`w-[20%] lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 mx-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/tasks"
              className="block mt-4 mx-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 transition duration-300"
            >
              Task
            </Link>
            <Link
              to="/add-task"
              className="block mt-4 mx-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 transition duration-300"
            >
              Create Task
            </Link>
            <Link
              to="/"
              className="block mt-4 mx-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 transition duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
