import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Task = ({ id, title, description, completed, onEdit, onDelete }) => {
  const navigateTo = useNavigate();

  const handleDetails = () => {
    navigateTo(`/task/${id}`);
  };

  return (
    <div className="bg-white mx-auto p-4 rounded shadow-md mb-4">
      <h2 className="text-2xl font-bold text-black">Title: {title}</h2>
      <p className="text-gray-700 line-clamp-3">{description}</p>
      <p
        className={`text-gray-200 px-2 w-[50%] ${
          completed ? "bg-green-600" : "bg-red-600"
        }`}
      >
        Status: {completed ? "Completed" : "Not Completed"}
      </p>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onEdit(id)}
          className="bg-[#2E9CCD] hover:bg-[#0f4d68] text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out opacity-100 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out"
        >
          Delete
        </button>
        <button
          onClick={handleDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Task;
