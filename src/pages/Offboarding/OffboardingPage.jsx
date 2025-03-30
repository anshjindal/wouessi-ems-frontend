import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/OffboardingPage.css';

const OffboardingPage = ({ user }) => {  // passing the employee role here to check for admin perms
    const navigate = useNavigate();

    // Dummy data for the table
    const processes = [
        {
            id: 1,
            title: "Intern Offboarding Process",
            description: "Steps for intern offboarding including equipment return and exit interview",
            status: "Not Started"
        },
    ];

    const handleCreateClick = () => {
        if (user?.role !== 'admin') {
            alert('Only admin users can create new offboarding processes');
            return;
        }
        navigate('/offboarding/create');
    };

    return (
        <div className="offboarding-container">
            <div className="offboarding-header">
                <h1>Offboarding Processes</h1>
                <button
                    className="create-process-btn"
                    onClick={() => navigate('/offboarding/create')}
                    disabled={user?.role !== 'admin'} 
                    >
                    + Create New Process
                </button>
            </div>

            <div className="processes-table-container">
                {processes.length === 0 ? (
                    <div className="empty-state">
                        <p>No offboarding processes found</p>
                    </div>
                ) : (
                    <table className="processes-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((process) => (
                                <tr key={process.id}>
                                    <td>{process.title}</td>
                                    <td>{process.description}</td>
                                    <td>
                                        <span className={`status-badge ${process.status.toLowerCase().replace(' ', '-')}`}>
                                            {process.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OffboardingPage;