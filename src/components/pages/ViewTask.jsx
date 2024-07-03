import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Task from "./Task";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (taskId) => {
    console.log("Edit task with id:", taskId);
    navigate(`/edit-task/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      console.log("Task deleted successfully:", taskId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">View Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-700">No tasks available.</p>
      ) : (
        tasks.map((task,index) => (
          <Task
            key={index}
            id={task._id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate("/add-task")}
          className="bg-[#182C47] hover:bg-[#44658f] text-white font-bold py-2 px-4 rounded"
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
