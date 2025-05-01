import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import student from "../../assets/icons/student.png";
import vettingSystem from "../../assets/icons/vettingSytem.png"
import cohorts from "../../assets/icons/cohorts.png"
import EMS from "../../assets/icons/EMS.png"
import wouessiVettingLogo from "../../assets/icons/wouessiVettingLogo.png"
import "../../styles/pages/VettingProcess.css";

const VettingProcess = () => {
    const [cohort, setCohort] = useState('Cohort 4');
    const [registeredStudents, setRegisteredStudents] = useState(450);
    const [selectedCriteriaCount, setSelectedCriteriaCount] = useState(0);

    // Setup React Hook Form
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            ageMin: "18",
            ageMax: "28",
            gender: {
                men: false,
                woman: false,
                twoSpirit: true
            },
            ethnicity: {
                black: false,
                white: false,
                indigenous: true
            },
            demographics: {
                immigrant: true,
                newComer: true,
                peopleWithDisability: true
            },
            training: {
                mobileDevelopment: true,
                dataScience: false
            },
            location: {
                southern: true,
                northern: true
            },
            immigrationStatus: {
                canadianCitizen: false,
                permanentStudent: true,
                internationalStudent: true
            },
            justiceSystem: {
                one: true,
                two: false,
                three: false
            },
            employmentStatus: {
                openWorkPermit: true,
                onEI: false
            },
            sinSeries: {
                s500: true,
                s600: false,
                s700: true,
                s800: false,
                s900: true
            },
            notParticipated: {
                y2022: false,
                y2023: false,
                y2024: true,
                y2025: true
            },
            participated: {
                y2022: true,
                y2023: true,
                y2024: false,
                y2025: true
            }
        }
    });

    const watchAllFields = watch();

    useEffect(() => {
        let count = 0;

        const countCheckboxes = (obj) => {
            if (!obj) return 0;
            return Object.values(obj).filter(value => value === true).length;
        };

        count += countCheckboxes(watchAllFields.gender);
        count += countCheckboxes(watchAllFields.ethnicity);
        count += countCheckboxes(watchAllFields.demographics);
        count += countCheckboxes(watchAllFields.training);
        count += countCheckboxes(watchAllFields.location);
        count += countCheckboxes(watchAllFields.immigrationStatus);
        count += countCheckboxes(watchAllFields.justiceSystem);
        count += countCheckboxes(watchAllFields.employmentStatus);
        count += countCheckboxes(watchAllFields.sinSeries);
        count += countCheckboxes(watchAllFields.notParticipated);
        count += countCheckboxes(watchAllFields.participated);

        if (watchAllFields.ageMin && watchAllFields.ageMax) {
            count += 1;
        }

        setSelectedCriteriaCount(count);
    }, [watchAllFields]);

    const onSubmit = (data) => {
        console.log("Form submitted with:", data);
        alert(`Vetting process started with ${selectedCriteriaCount} criteria`);
    };

    return (
        <div className="vetting-app-container">
            {/* Sidebar */}
            <div className="vetting-sidebar">
                <div className="vetting-sidebar-header">
                <img src={EMS} alt="EMS" className="vetting-tittle-nav-icon" />
                    <p className="vetting-sidebar-subtitle">Employee Management System</p>
                </div>
                <hr/>
                <nav className="vetting-sidebar-nav">
                    <div className="vetting-nav-item">
                        <img src={student} alt="Student" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Students</span>
                    </div>
                    <div className="vetting-nav-item active">
                        <img src={vettingSystem} alt="Vetting" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Vetting system</span>
                    </div>
                    <div className="vetting-nav-item">
                        <img src={cohorts} alt="Cohorts" className="vetting-nav-icon" />
                        <span className="vetting-nav-text">Cohorts</span>
                    </div>
                </nav>
                <div className="vetting-sidebar-footer">
                <img src={wouessiVettingLogo} alt="VettingLogo" className="vetting-nav-icon" />
                    <p className="vetting-sidebar-subtitle">EMS is a product of</p>
                    <p className="vetting-sidebar-subtitle">WOESEI INC.</p>
                </div>
            </div>


            {/* Main Content */}
            <div className="vetting-main-content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="vetting-title-row">
                        <h1 className="vetting-form-title">Registration</h1>
                        <span className="vetting-cohort-tag">{cohort}</span>
                    </div>
                    <p className="vetting-page-subtitle">
                        Select the eligibility requirements for this cohort's <strong>{registeredStudents} registered students</strong>.
                    </p>

                    {/* Age Range */}
                    <div className="vetting-age-range-section">
                        <p className="vetting-section-label">Aged between:</p>
                        <div className="vetting-age-range-controls">
                            <select
                                className="vetting-age-select vetting-custom-select"
                                {...register("ageMin", { required: true })}
                            >
                                <option value="18">18</option>
                                <option value="20">20</option>
                            </select>
                            <span className="vetting-age-connector">and</span>
                            <select
                                className="vetting-age-select vetting-custom-select"
                                {...register("ageMax", { required: true })}
                            >
                                <option value="28">28</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                            </select>
                        </div>
                        {errors.ageMin && <span className="error-message">Minimum age is required</span>}
                        {errors.ageMax && <span className="error-message">Maximum age is required</span>}
                    </div>

                    {/* Categories Grid */}
                    <div className="vetting-criteria-grid">
                        {/* Gender */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Gender/ Identify</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("gender.men")}
                                    />
                                    <span className="vetting-checkbox-text">Men</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("gender.woman")}
                                    />
                                    <span className="vetting-checkbox-text">Woman</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("gender.twoSpirit")}
                                    />
                                    <span className="vetting-checkbox-text">Two spirit</span>
                                </label>
                            </div>
                        </div>

                        {/* Ethnicity */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Ethnicity</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("ethnicity.black")}
                                    />
                                    <span className="vetting-checkbox-text">Black</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("ethnicity.white")}
                                    />
                                    <span className="vetting-checkbox-text">White</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("ethnicity.indigenous")}
                                    />
                                    <span className="vetting-checkbox-text">Indigenous</span>
                                </label>
                            </div>
                        </div>

                        {/* Demographics */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Demographics</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("demographics.immigrant")}
                                    />
                                    <span className="vetting-checkbox-text">Immigrant</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("demographics.newComer")}
                                    />
                                    <span className="vetting-checkbox-text">New comer</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("demographics.peopleWithDisability")}
                                    />
                                    <span className="vetting-checkbox-text">People with disability</span>
                                </label>
                            </div>
                        </div>

                        {/* Training */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Completed training</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("training.mobileDevelopment")}
                                    />
                                    <span className="vetting-checkbox-text">Mobile and software development</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("training.dataScience")}
                                    />
                                    <span className="vetting-checkbox-text">Data science</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="vetting-checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">...</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">...</span>
                                </label>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Location in Ontario</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("location.southern")}
                                    />
                                    <span className="vetting-checkbox-text">Southern Ontario</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">Northern Ontario</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("location.northern")}
                                    />
                                    <span className="vetting-checkbox-text">Northern Ontario</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">...</span>
                                </label>
                            </div>
                        </div>

                        {/* Immigration Status */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Immigration status</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("immigrationStatus.canadianCitizen")}
                                    />
                                    <span className="vetting-checkbox-text">Canadian Citizen</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("immigrationStatus.permanentStudent")}
                                    />
                                    <span className="vetting-checkbox-text">Permanent Student</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("immigrationStatus.internationalStudent")}
                                    />
                                    <span className="vetting-checkbox-text">International student</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">...</span>
                                </label>
                            </div>
                        </div>

                        {/* Justice System */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Justice system</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("justiceSystem.one")}
                                    />
                                    <span className="vetting-checkbox-text">1</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("justiceSystem.two")}
                                    />
                                    <span className="vetting-checkbox-text">2</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("justiceSystem.three")}
                                    />
                                    <span className="vetting-checkbox-text">3</span>
                                </label>
                            </div>
                        </div>

                        {/* Employment Status */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Employment status</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("employmentStatus.openWorkPermit")}
                                    />
                                    <span className="vetting-checkbox-text">Open work permit</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("employmentStatus.onEI")}
                                    />
                                    <span className="vetting-checkbox-text">On EI</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input type="checkbox" className="vetting-checkbox-input" />
                                    <span className="vetting-checkbox-text">...</span>
                                </label>
                            </div>
                        </div>

                        {/* SIN Number Series */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">SIN Number series</h>
                            <div className="vetting-sin-grid">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("sinSeries.s500")}
                                    />
                                    <span className="vetting-checkbox-text">500</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("sinSeries.s800")}
                                    />
                                    <span className="vetting-checkbox-text">800</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("sinSeries.s600")}
                                    />
                                    <span className="vetting-checkbox-text">600</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("sinSeries.s900")}
                                    />
                                    <span className="vetting-checkbox-text">900</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("sinSeries.s700")}
                                    />
                                    <span className="vetting-checkbox-text">700</span>
                                </label>
                            </div>
                        </div>

                        {/* Not Participated */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Have NOT participated in another Ontario Skill Development program in</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("notParticipated.y2022")}
                                    />
                                    <span className="vetting-checkbox-text">2022</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("notParticipated.y2023")}
                                    />
                                    <span className="vetting-checkbox-text">2023</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("notParticipated.y2024")}
                                    />
                                    <span className="vetting-checkbox-text">2024</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("notParticipated.y2025")}
                                    />
                                    <span className="vetting-checkbox-text">2025</span>
                                </label>
                            </div>
                        </div>

                        {/* Participated */}
                        <div className="vetting-criteria-section">
                            <h className="vetting-criteria-title">Have participated in another Ontario Skill Development program in</h>
                            <div className="vetting-checkbox-group">
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("participated.y2022")}
                                    />
                                    <span className="vetting-checkbox-text">2022</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("participated.y2023")}
                                    />
                                    <span className="vetting-checkbox-text">2023</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("participated.y2024")}
                                    />
                                    <span className="vetting-checkbox-text">2024</span>
                                </label>
                                <label className="vetting-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="vetting-checkbox-input"
                                        {...register("participated.y2025")}
                                    />
                                    <span className="vetting-checkbox-text">2025</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Run vetting process button */}
                    <div className="vetting-button-container">
                        <button type="submit" className="vetting-button">
                            Run vetting process
                            <span className="vetting-button-badge">{selectedCriteriaCount}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VettingProcess;