import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, completed };

    try {
        const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
        });

        if (!response.ok) {
        throw new Error('Failed to add task');
        }

        console.log('Task added successfully:', newTask);
        navigateTo("/tasks");
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">Completed</span>
          </label>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-[#2E9CCD] hover:bg-[#0a648a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
