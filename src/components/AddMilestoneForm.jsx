import { useState } from "react";

const AddMilestoneForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    assignee: "",
    timeTracked: 0,
    startDate: "",
    dueDate: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onTaskAdded(data);
    setForm({
      title: "", description: "", status: "Pending", assignee: "", timeTracked: 0,
      startDate: "", dueDate: "", priority: "Medium"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded bg-white shadow-md">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 border rounded" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded" />
      
      <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded">
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
      </select>

      <input name="assignee" placeholder="Assignee" value={form.assignee} onChange={handleChange} className="p-2 border rounded" />
      
      <input type="number" name="timeTracked" placeholder="Time Tracked (minutes)" value={form.timeTracked} onChange={handleChange} className="p-2 border rounded" />

      <label>Start Date</label>
      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="p-2 border rounded" />

      <label>Due Date</label>
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="p-2 border rounded" />

      <select name="priority" value={form.priority} onChange={handleChange} className="p-2 border rounded">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">Add Milestone</button>
    </form>
  );
};

export default AddMilestoneForm;
