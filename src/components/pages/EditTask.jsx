import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
   const { id } = useParams();
   const navigateTo = useNavigate();
   const [task, setTask] = useState({
     title: "",
     description: "",
     completed: false,
   });

   useEffect(() => {
     const fetchTask = async () => {
       try {
         const response = await fetch(`http://localhost:4000/tasks/${id}`);
         if (!response.ok) {
           throw new Error("Task not found");
         }
         const data = await response.json();
         setTask(data);
       } catch (error) {
         console.error("Error fetching task:", error);
         navigateTo("/tasks");
       }
     };

     fetchTask();
   }, [id]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch(`http://localhost:4000/tasks/${id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(task),
       });

       if (!response.ok) {
         throw new Error("Failed to update task");
       }

       navigateTo("/tasks");
     } catch (error) {
       console.error("Error updating task:", error);
     }
   };

   const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
     setTask((prevTask) => ({
       ...prevTask,
       [name]: type === "checkbox" ? checked : value,
     }));
   };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="completed"
              className="form-checkbox"
              checked={task.completed}
              onChange={handleChange}
            />
            <span className="ml-2 text-gray-700">Completed</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#2E9CCD] hover:bg-[#114f6a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
