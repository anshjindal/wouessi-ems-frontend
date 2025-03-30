import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiSettings, FiEdit2, FiPlus, FiTrash2, FiUpload, FiCalendar } from 'react-icons/fi';
import '../../styles/pages/OffboardingPage.css';

const OffboardingPage = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('standard');
  const [processes, setProcesses] = useState([

    // Dummy data to test responsiveness
    {
      id: 1,
      title: "Intern Offboarding",
      description: "Steps for intern offboarding",
      status: "Not Started",
      createdAt: "2025-05-15",
      updatedAt: "2025-05-15"
    },
    {
      id: 2,
      title: "Full-time Offboarding",
      description: "Regular employee process",
      status: "In Progress",
      createdAt: "2025-06-20",
      updatedAt: "2025-06-22"
    }
  ]);
  /*
  const handleProcessUpdate = (updatedProcess) => {
    setProcesses(processes.map(p => 
      p.id === updatedProcess.id ? updatedProcess : p
    ));
  }; */

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="offboarding-container">
      <div className="offboarding-header">
        <h1>Offboarding Processes</h1>
        
        { /* Change to !== to see how it looks like if you don't have an admin account */ }
        {user?.role === 'admin' && (
          <div className="view-tabs">
            <button
              className={`tab-btn ${activeTab === 'standard' ? 'active' : ''}`}
              onClick={() => setActiveTab('standard')}
            >
              <FiUser /> Standard
            </button>
            <button
              className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <FiSettings /> Admin
            </button>
          </div>
        )}
      </div>

      {activeTab === 'admin' && (
        <div className="admin-controls">
          <button
            className="create-process-btn"
            onClick={() => navigate('/offboarding/create')}
          >
            <FiPlus /> New Process
          </button>
        </div>
      )}

      <div className="processes-table-container">
        {processes.length === 0 ? (
          <div className="empty-state">
            <p>No offboarding processes found</p>
            {activeTab === 'admin' && (
              <button 
                className="create-process-btn"
                onClick={() => navigate('/offboarding/create')}
              >
                <FiPlus /> Create First Process
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="mobile-processes">
              {processes.map((process) => (
                <div key={process.id} className="process-card">
                  <div className="card-header">
                    <h3>{process.title}</h3>
                    <span className={`status-badge ${process.status.toLowerCase().replace(' ', '-')}`}>
                      {process.status}
                    </span>
                  </div>
                  <p>{process.description}</p>
                  <div className="card-dates">
                    <div>
                      <FiCalendar /> Created: {formatDate(process.createdAt)}
                    </div>
                    {activeTab === 'admin' && (
                      <div>
                        <FiCalendar /> Updated: {formatDate(process.updatedAt)}
                      </div>
                    )}
                  </div>
                  {activeTab === 'admin' && (
                    <div className="card-actions">
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/offboarding/edit/${process.id}`)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm('Delete this process?')) {
                            setProcesses(processes.filter(p => p.id !== process.id));
                          }
                        }}
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        className="upload-btn"
                        onClick={() => navigate(`/offboarding/${process.id}/upload`)}
                      >
                        <FiUpload />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <table className="processes-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  {activeTab === 'admin' && <th>Created</th>}
                  {activeTab === 'admin' && <th>Updated</th>}
                  {activeTab === 'admin' && <th>Actions</th>}
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
                    {activeTab === 'admin' && <td>{formatDate(process.createdAt)}</td>}
                    {activeTab === 'admin' && <td>{formatDate(process.updatedAt)}</td>}
                    {activeTab === 'admin' && (
                      <td className="actions-cell">
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/offboarding/edit/${process.id}`)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm('Delete this process?')) {
                              setProcesses(processes.filter(p => p.id !== process.id));
                            }
                          }}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          className="upload-btn"
                          onClick={() => navigate(`/offboarding/${process.id}/upload`)}
                          title="Upload"
                        >
                          <FiUpload />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default OffboardingPage;