import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Task List</h2>
      <AddTaskForm onTaskAdded={(newTask) => setTasks([...tasks, newTask])} />
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="border rounded p-2 mb-2">
            <strong>{task.title}</strong> - <em>{task.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
