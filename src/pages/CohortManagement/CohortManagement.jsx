import { useState } from 'react';
import styles from "./CohortManagement.module.scss";
import SideBar from "../../components/Sidebar"

// Sidebar component


// Step indicator component
// @ts-ignore
const StepIndicator = ({ active }) => (
    <div className={`${styles["step-indicator"]} ${active ? styles.active : ''}`}>
        <div className={styles["step-circle"]}></div>
    </div>
);

// Stats Badge component
// @ts-ignore
const StatsBadge = ({ label, count }) => (
    <div className={styles["stats-badge"]}>
        <span className={styles["stats-label"]}>{label}</span>
        <span className={styles["stats-count"]}>{count}</span>
    </div>
);

// Process step component 
// @ts-ignore
const ProcessStep = ({ title, children, isActive, showStepIndicator = true, contentClass = '' }) => (
    <div className={styles["process-step"]}>
        {showStepIndicator && <StepIndicator active={isActive} />}
        <div className={styles["process-step-content"]}>
            <h3 className={styles["process-step-title"]}>{title}</h3>
            <hr />
            <div className={`${styles["process-step-body"]} ${contentClass}`}>
                {children}
            </div>
        </div>
    </div>
);

// Main component
const CohortManagement = () => {
    const [activeCohort, setActiveCohort] = useState('4');
    const [notes, setNotes] = useState({
        registration: '',
        financial: ''
    });

    // @ts-ignore
    const handleNoteChange = (section, value) => {
        setNotes(prev => ({
            ...prev,
            [section]: value
        }));
    };

    return (
        <div className={styles["cohorts-management-app-container"]}>
            <SideBar 
// @ts-ignore
            activeItem="cohorts" />
            <div className={styles["cohorts-management-main-content"]}>
                <div className={styles["cohorts-management-header"]}>
                    <h1 className={styles["cohorts-management-title"]}>Cohorts management</h1>
                    <p className={styles["cohorts-management-subtitle"]}>
                        Create, activate or change the currently active cohort. Every step of an active
                        cohort can be monitored and managed.
                    </p>
                </div>

                <div className={styles["process-timeline"]}>
                    {/* Active Cohort Section */}
                    <ProcessStep title="Active cohort" isActive={true} contentClass={styles["active-cohort-content"]}>
                        <div className={styles["active-cohort-selector"]}>
                            <div className={styles["selector-wrapper"]}>
                                <span className={styles["selector-label"]}>Active cohort</span>
                                <select
                                    value={activeCohort}
                                    onChange={(e) => setActiveCohort(e.target.value)}
                                    className={styles["cohort-select"]}
                                >
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <button className={styles["activate-btn"]}>Activate</button>
                        </div>
                    </ProcessStep>

                    {/* Registration Section */}
                    <ProcessStep title="Registration" isActive={true} contentClass={styles["registration-body"]}>
                        <div className={styles["stats-container"]}>
                            <StatsBadge label="Registered" count="450" />
                            <StatsBadge label="Qualified" count="383" />
                            <StatsBadge label="Unqualified" count="67" />
                            <button className={styles["vetting-btn"]}>
                                Run vetting process
                                <span className={styles["lock-icon"]}>🔒</span>
                            </button>
                        </div>
                        <div className={styles["notes-section"]}>
                            <p className={styles["notes-label"]}>Keep track of what happened at this stage of the process.</p>
                            <textarea
                                value={notes.registration}
                                onChange={(e) => handleNoteChange('registration', e.target.value)}
                                className={styles["notes-textarea"]}
                            />
                        </div>
                        <button className={styles["note-btn"]}>Note</button>
                    </ProcessStep>

                    {/* Financial Information Section */}
                    <ProcessStep title="Financial information" isActive={true}contentClass={styles["information-body"]}>
                        <div className={styles["stats-container"]}>
                            <StatsBadge label="Registered" count="450" />
                            <StatsBadge label="Void cheque submitted" count="383" />
                        </div>
                        <div className={styles["notes-section"]}>
                            <p className={styles["notes-label"]}>Keep track of what happened at this stage of the process.</p>
                            <textarea
                                value={notes.financial}
                                onChange={(e) => handleNoteChange('financial', e.target.value)}
                                className={styles["notes-textarea"]}
                            />
                            <button className={styles["note-btn"]}>Note</button>
                        </div>
                    </ProcessStep>
                </div>
            </div>
        </div>
    );
};

export default CohortManagement;