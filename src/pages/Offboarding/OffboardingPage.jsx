import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/OffboardingPage.css';

const OffboardingPage = () => {
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

    return (
        <div className="offboarding-container">
            <div className="offboarding-header">
                <h1>Offboarding Processes</h1>
                <button 
                    onClick={() => navigate('/offboarding/create')}
                    className="create-process-btn"
                >
                    + Create New Process
                </button>
            </div>

            <div className="processes-table-container">
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
            </div>
        </div>
    );
};

export default OffboardingPage;