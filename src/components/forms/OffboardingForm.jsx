import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/OffboardingForm.css";

const OffboardingForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        checklistItems: [""],
        emailRecipients: [""]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChecklistChange = (index, value) => {
        const newChecklistItems = [...formData.checklistItems];
        newChecklistItems[index] = value;
        setFormData(prev => ({
            ...prev,
            checklistItems: newChecklistItems
        }));
    };

    const handleEmailRecipientChange = (index, value) => {
        const newEmailRecipients = [...formData.emailRecipients];
        newEmailRecipients[index] = value;
        setFormData(prev => ({
            ...prev,
            emailRecipients: newEmailRecipients
        }));
    };

    const addChecklistItem = () => {
        setFormData(prev => ({
            ...prev,
            checklistItems: [...prev.checklistItems, ""]
        }));
    };

    const addEmailRecipient = () => {
        setFormData(prev => ({
            ...prev,
            emailRecipients: [...prev.emailRecipients, ""]
        }));
    };

    const removeChecklistItem = (index) => {
        const newChecklistItems = formData.checklistItems.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            checklistItems: newChecklistItems
        }));
    };

    const removeEmailRecipient = (index) => {
        const newEmailRecipients = formData.emailRecipients.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            emailRecipients: newEmailRecipients
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send to backend?
        console.log("Form submitted:", formData);
        alert("Offboarding process created successfully!");
        navigate("/offboarding"); // redirect back to offboarding
    };

    return (
        <div className="offboarding-form-container">
            <h2>Create Offboarding Process</h2>
            <form onSubmit={handleSubmit} className="offboarding-form">
                <div className="form-group">
                    <label htmlFor="title">Title*</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter process title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter process description"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label>Checklist Items*</label>
                    {formData.checklistItems.map((item, index) => (
                        <div key={index} className="checklist-item">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleChecklistChange(index, e.target.value)}
                                required
                                placeholder={`Checklist item ${index + 1}`}
                            />
                            {formData.checklistItems.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeChecklistItem(index)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addChecklistItem}
                        className="add-btn"
                    >
                        Add Checklist Item
                    </button>
                </div>

                <div className="form-group">
                    <label>Email Recipients*</label>
                    {formData.emailRecipients.map((email, index) => (
                        <div key={index} className="email-recipient">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => handleEmailRecipientChange(index, e.target.value)}
                                required
                                placeholder={`recipient${index + 1}@company.com`}
                            />
                            {formData.emailRecipients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEmailRecipient(index)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addEmailRecipient}
                        className="add-btn"
                    >
                        Add Email Recipient
                    </button>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/offboarding")}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Create Process
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OffboardingForm;