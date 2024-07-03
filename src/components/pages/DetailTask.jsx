import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailTask = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:4000/tasks/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleEdit = () => {
    navigateTo(`/edit-task/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigateTo("/tasks");
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!task) {
    return <div>No task found</div>;
  }

  return (
    <div className="lg:w-[50%] mt-4 mx-auto">
      <h2 className="text-2xl font-bold text-black">Title: {task.title}</h2>
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <p className="text-gray-700">{task.description}</p>
        <p
          className={`text-gray-200 px-2 w-[50%] ${
            task.completed ? "bg-green-600" : "bg-red-600"
          }`}
        >
          Status: {task.completed ? "Completed" : "Not Completed"}
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEdit}
            className="bg-[#2E9CCD] hover:bg-[#0f4d68] text-white font-bold py-2 px-4 rounded mr-2 transition duration-300 ease-in-out opacity-100 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;
