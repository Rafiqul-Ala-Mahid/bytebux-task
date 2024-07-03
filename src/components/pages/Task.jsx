// eslint-disable-next-line react/prop-types
const Task = ({ id, title, description, completed, onEdit, onDelete }) => (
  <div
    className={`bg-white p-4 rounded shadow-md mb-4 ${
      completed ? "border-green-500" : "border-red-500"
    } ${completed ? "bg-green-100" : "bg-red-100"}`}
  >
    <h2
      className={`text-2xl font-bold ${
        completed ? "text-green-800" : "text-red-800"
      }`}
    >
      Title: {title}
    </h2>
    <p className="text-gray-700">Description: {description}</p>
    <p
      className={`text-gray-600 ${
        completed ? "text-green-600" : "text-red-600"
      }`}
    >
      Status: {completed ? "Completed" : "Not Completed"}
    </p>
    <div className="flex justify-end mt-4">
      <button
        onClick={() => onEdit(id)}
        className={`bg-[#2E9CCD] hover:bg-[#0f4d68] text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out opacity-100 cursor-pointer `}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Delete
      </button>
    </div>
  </div>
);

export default Task;
