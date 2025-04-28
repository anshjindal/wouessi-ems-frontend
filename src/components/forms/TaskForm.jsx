import React, { useState, useEffect } from 'react';
import '../../styles/components/TaskForm.css';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSave = () => {
        if (!task.title.trim()) {
            setError('Title is required.');
            return;
        }
        if (!task.dueDate) {
            setError('Due Date is required.');
            return;
        }
        const updatedTasks = [...tasks, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        alert("Task saved!");
        setTask({ title: '', description: '', dueDate: '' });
    };

    return (
        <div className="task-form-container">
            <div className="task-form">
                <h2>Create Task</h2>
                {error && <div className="error">{error}</div>}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={task.title}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={task.description}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                />
                <button onClick={handleSave}>Save Task</button>
            </div>
            {tasks.length > 0 && (
                <div className="task-list">
                    <h3>Saved Tasks</h3>
                    <ul>
                        {tasks.map((t, index) => (
                            <li key={index}>
                                <strong>{t.title}</strong> - {t.description} (Due: {t.dueDate})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskForm;