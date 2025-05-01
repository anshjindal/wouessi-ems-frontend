import { useEffect, useState } from "react";
import AddMilestoneForm from "./AddMilestoneForm";

const MilestoneList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched tasks:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Could not load tasks.");
        setLoading(false);
      });
  }, []);

  // Local-only status update
  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Milestone List</h2>

      <AddMilestoneForm
        onTaskAdded={(newTask) => setTasks((prev) => [...prev, newTask])}
      />

      {loading && <p className="text-gray-500 mt-4">Loading tasks...</p>}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && tasks.length === 0 && !error && (
        <p className="text-gray-600 mt-4">No tasks available.</p>
      )}

      {!loading && tasks.length > 0 && (
        <div className="grid gap-4 mt-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Status:</span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <p>Assignee: {task.assignee || "N/A"}</p>
              <p>Tracked Time: {task.timeTracked ?? 0} minutes</p>
              <p>
                Start: {task.startDate ? task.startDate.substring(0, 10) : "N/A"}
              </p>
              <p>
                Due: {task.dueDate ? task.dueDate.substring(0, 10) : "N/A"}
              </p>
              <p>Priority: {task.priority || "None"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MilestoneList;
