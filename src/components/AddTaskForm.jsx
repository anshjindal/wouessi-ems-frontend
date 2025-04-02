import { useState } from "react";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, status: "Pending" };

    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    onTaskAdded(data);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={title}
        placeholder="New Task"
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
