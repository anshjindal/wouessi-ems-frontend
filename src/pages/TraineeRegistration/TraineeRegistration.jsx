import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/pages/TraineeRegistration.css";

const cohorts = ["Cohort 1", "Cohort 2", "Cohort 3", "Cohort 4"];
const ethnicities = ["Black", "White", "Asian", "Indigenous", "Other"];
const immigrationStatuses = ["Student visa", "Permanent Resident", "Citizen", "Other"];

export default function TraineeRegistration() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="header-section">
                    <h1 className="form-title">Registration</h1>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h2 className="section-title">Personal Information</h2>
                        <div className="cohort-select">
                            <select id="cohort" {...register("cohort")} className="cohort-dropdown">
                                <option value="">Select</option>
                                {cohorts.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="field-row">
                        <div className="field-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" {...register("firstName")} className="input" />
                        </div>

                        <div className="field-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" {...register("email")} className="input" />
                        </div>
                    </div>

                    <div className="field-row">
                        <div className="field-group">
                            <label htmlFor="middleName">Middle Name</label>
                            <input id="middleName" {...register("middleName")} className="input" />
                        </div>

                        <div className="field-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input id="contactNumber" {...register("contactNumber")} className="input" />
                        </div>
                    </div>

                    <div className="field-row">
                        <div className="field-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" {...register("lastName")} className="input" />
                        </div>

                        <div className="field-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                {...register("dateOfBirth")}
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="field-row">
                        <div className="field-group location-field-group">
                            <label htmlFor="location">Where you live in Ontario</label>
                            <input id="location" {...register("location")} className="input" />
                        </div>
                        <div className="field-group location-spacer"></div>
                    </div>
                </div>

                <div className="section">
                    <h2 className="section-title">Identity and Demographics</h2>

                    <div className="field-group">
                        <label
                            className="identity-label"
                            style={{ fontWeight: 'bold' }}
                        >
                            What do you identify as
                        </label>
                        <div className="radio-options">
                            <label className="radio-label">
                                <input type="radio" value="Man" {...register("gender")} />
                                <span className="radio-text">Man</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="Woman" {...register("gender")} />
                                <span className="radio-text">Woman</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="Two spirit" {...register("gender")} />
                                <span className="radio-text">Two spirit</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="Other" {...register("gender")} />
                                <span className="radio-text">Other</span>
                            </label>
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="disability-label"
                            style={{ fontWeight: 'bold' }}>Are you a person of disability</label>
                        <div className="radio-options">
                            <label className="radio-label">
                                <input type="radio" value="Yes" {...register("disability")} />
                                <span className="radio-text">Yes</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" value="No" {...register("disability")} />
                                <span className="radio-text">No</span>
                            </label>
                        </div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="ethnicity" className="ethnicity-label"
                            style={{ fontWeight: 'bold' }}>What is your ethnicity</label>
                        <div className="select-wrapper">
                            <select id="ethnicity" {...register("ethnicity")} className="input">
                                <option value="">Select</option>
                                {ethnicities.map((e) => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="consider-label"
                            style={{ fontWeight: 'bold' }}>Do you consider yourself an</label>
                        <div className="checkbox-options">
                            <label className="checkbox-label">
                                <input type="checkbox" value="Immigrant" {...register("selfIdentity")} />
                                <span className="checkbox-text">Immigrant</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" value="New comer" {...register("selfIdentity")} />
                                <span className="checkbox-text">New comer</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" value="Other" {...register("selfIdentity")} />
                                <span className="checkbox-text">Other</span>
                            </label>
                        </div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="immigrationStatus" className="immigration-label"
                            style={{ fontWeight: 'bold' }}>What is your immigration status in Canada</label>
                        <div className="select-wrapper">
                            <select id="immigrationStatus" {...register("immigrationStatus")} className="input">
                                <option value="">Select</option>
                                {immigrationStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}