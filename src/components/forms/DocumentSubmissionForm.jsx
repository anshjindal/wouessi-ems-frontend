import React, { useState } from 'react';
import '../../styles/components/DocumentSubmissionForm.css';

const DocumentSubmissionForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedDocs, setUploadedDocs] = useState([]);

    // Handle file selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // Simulate "upload" by storing in local state
    const handleUpload = () => {
        if (selectedFiles.length === 0) {
            alert('No files selected.');
            return;
        }
        // Append new files to the existing list of uploadedDocs
        const newDocs = [...uploadedDocs, ...selectedFiles];
        setUploadedDocs(newDocs);
        alert('Files uploaded successfully!');
        // Clear selected files
        setSelectedFiles([]);
    };

    return (
        <div className="doc-upload-container">
            <h2>Document Submission</h2>
            <div className="file-input-section">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <button onClick={handleUpload}>Upload</button>
            </div>

            {/* Show selected file names before upload */}
            {selectedFiles.length > 0 && (
                <div className="selected-files">
                    <h4>Ready to Upload:</h4>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Show already "uploaded" documents */}
            {uploadedDocs.length > 0 && (
                <div className="uploaded-docs">
                    <h4>Uploaded Documents:</h4>
                    <ul>
                        {uploadedDocs.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DocumentSubmissionForm;