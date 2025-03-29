import React, { useState } from 'react';
import './MilestoneForm.css'; // Importing the CSS file

const MilestoneForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Store the milestone locally (in localStorage)
        const milestone = { title, description, dueDate };
        localStorage.setItem('milestone', JSON.stringify(milestone));
        alert('Milestone saved!');
        // Reset form fields
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <div className="milestone-form"> {/* Wrapper div with the class name for styling */}
            <form onSubmit={handleSubmit}>
                <h2>Create Milestone</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Milestone</button>
            </form>
        </div>
    );
};

export default MilestoneForm;

