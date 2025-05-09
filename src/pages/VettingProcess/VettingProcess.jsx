import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./VettingProcess.module.scss";

const VettingProcess = () => {
    // @ts-ignore
    const [cohort, setCohort] = useState("Cohort 4");
    // @ts-ignore
    const [registeredStudents, setRegisteredStudents] = useState(450);
    const [selectedCriteriaCount, setSelectedCriteriaCount] = useState(0);

    // Setup React Hook Form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ageMin: "18",
            ageMax: "28",
            gender: {
                men: false,
                woman: false,
                twoSpirit: true,
            },
            ethnicity: {
                black: false,
                white: false,
                indigenous: true,
            },
            demographics: {
                immigrant: true,
                newComer: true,
                peopleWithDisability: true,
            },
            training: {
                mobileDevelopment: true,
                dataScience: false,
            },
            location: {
                southern: true,
                northern: true,
            },
            immigrationStatus: {
                canadianCitizen: false,
                permanentStudent: true,
                internationalStudent: true,
            },
            justiceSystem: {
                one: true,
                two: false,
                three: false,
            },
            employmentStatus: {
                openWorkPermit: true,
                onEI: false,
            },
            sinSeries: {
                s500: true,
                s600: false,
                s700: true,
                s800: false,
                s900: true,
            },
            notParticipated: {
                y2022: false,
                y2023: false,
                y2024: true,
                y2025: true,
            },
            participated: {
                y2022: true,
                y2023: true,
                y2024: false,
                y2025: true,
            },
        },
    });

    const watchAllFields = watch();

    useEffect(() => {
        let count = 0;

        // @ts-ignore
        const countCheckboxes = (obj) => {
            if (!obj) return 0;
            return Object.values(obj).filter((value) => value === true).length;
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

    // @ts-ignore
    const onSubmit = (data) => {
        console.log("Form submitted with:", data);
        alert(`Vetting process started with ${selectedCriteriaCount} criteria`);
    };

    return (
        <div className={styles["vetting-main-content"]}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["vetting-title-row"]}>
                    <h1 className={styles["vetting-form-title"]}>Vetting Process</h1>
                    <span className={styles["vetting-cohort-tag"]}>{cohort}</span>
                </div>
                <p className={styles["vetting-page-subtitle"]}>
                    Select the eligibility requirements for this cohort's{" "}
                    <strong>{registeredStudents} registered students</strong>.
                </p>

                {/* Age Range */}
                <div className={styles["vetting-age-range-section"]}>
                    <p className={styles["vetting-section-label"]}>Aged between:</p>
                    <div className={styles["vetting-age-range-controls"]}>
                        <select
                            className={`${styles["vetting-age-select"]} ${styles["vetting-custom-select"]}`}
                            {...register("ageMin", { required: true })}
                        >
                            <option value="18">18</option>
                            <option value="20">20</option>
                        </select>
                        <span className={styles["vetting-age-connector"]}>and</span>
                        <select
                            className={`${styles["vetting-age-select"]} ${styles["vetting-custom-select"]}`}
                            {...register("ageMax", { required: true })}
                        >
                            <option value="28">28</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                        </select>
                    </div>
                    {errors.ageMin && (
                        <span className={styles["error-message"]}>Minimum age is required</span>
                    )}
                    {errors.ageMax && (
                        <span className={styles["error-message"]}>Maximum age is required</span>
                    )}
                </div>

                {/* Categories Grid */}
                <div className={styles["vetting-criteria-grid"]}>
                    {/* Gender */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Gender/ Identify</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("gender.men")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Men</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("gender.woman")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Woman</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("gender.twoSpirit")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Two spirit</span>
                            </label>
                        </div>
                    </div>

                    {/* Ethnicity */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Ethnicity</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("ethnicity.black")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Black</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("ethnicity.white")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>White</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("ethnicity.indigenous")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Indigenous</span>
                            </label>
                        </div>
                    </div>

                    {/* Demographics */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Demographics</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("demographics.immigrant")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Immigrant</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("demographics.newComer")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>New comer</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("demographics.peopleWithDisability")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>
                                    People with disability
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Training */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Completed training</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("training.mobileDevelopment")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>
                                    Mobile and software development
                                </span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("training.dataScience")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Data science</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="vetting-checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                />
                                <span className={styles["vetting-checkbox-text"]}>...</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input type="checkbox" className={styles["vetting-checkbox-input"]} />
                                <span className={styles["vetting-checkbox-text"]}>...</span>
                            </label>
                        </div>
                    </div>

                    {/* Location */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Location in Ontario</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("location.southern")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Southern Ontario</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input type="checkbox" className={styles["vetting-checkbox-input"]} />
                                <span className={styles["vetting-checkbox-text"]}>Northern Ontario</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("location.northern")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Northern Ontario</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input type="checkbox" className={styles["vetting-checkbox-input"]} />
                                <span className={styles["vetting-checkbox-text"]}>...</span>
                            </label>
                        </div>
                    </div>

                    {/* Immigration Status */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Immigration status</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("immigrationStatus.canadianCitizen")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Canadian Citizen</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("immigrationStatus.permanentStudent")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Permanent Student</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("immigrationStatus.internationalStudent")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>
                                    International student
                                </span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input type="checkbox" className={styles["vetting-checkbox-input"]} />
                                <span className={styles["vetting-checkbox-text"]}>...</span>
                            </label>
                        </div>
                    </div>

                    {/* Justice System */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Justice system</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("justiceSystem.one")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>1</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("justiceSystem.two")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("justiceSystem.three")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>3</span>
                            </label>
                        </div>
                    </div>

                    {/* Employment Status */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>Employment status</h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("employmentStatus.openWorkPermit")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>Open work permit</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("employmentStatus.onEI")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>On EI</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input type="checkbox" className={styles["vetting-checkbox-input"]} />
                                <span className={styles["vetting-checkbox-text"]}>...</span>
                            </label>
                        </div>
                    </div>

                    {/* SIN Number Series */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>SIN Number series</h3>
                        <div className={styles["vetting-sin-grid"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("sinSeries.s500")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>500</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("sinSeries.s800")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>800</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("sinSeries.s600")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>600</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("sinSeries.s900")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>900</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("sinSeries.s700")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>700</span>
                            </label>
                        </div>
                    </div>

                    {/* Not Participated */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>
                            Have NOT participated in another Ontario Skill Development program
                            in
                        </h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("notParticipated.y2022")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2022</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("notParticipated.y2023")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2023</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("notParticipated.y2024")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2024</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("notParticipated.y2025")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2025</span>
                            </label>
                        </div>
                    </div>

                    {/* Participated */}
                    <div className={styles["vetting-criteria-section"]}>
                        <h3 className={styles["vetting-criteria-title"]}>
                            Have participated in another Ontario Skill Development program in
                        </h3>
                        <div className={styles["vetting-checkbox-group"]}>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("participated.y2022")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2022</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("participated.y2023")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2023</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("participated.y2024")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2024</span>
                            </label>
                            <label className={styles["vetting-checkbox-label"]}>
                                <input
                                    type="checkbox"
                                    className={styles["vetting-checkbox-input"]}
                                    {...register("participated.y2025")}
                                />
                                <span className={styles["vetting-checkbox-text"]}>2025</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Run vetting process button */}
                <div className={styles["vetting-button-container"]}>
                    <button type="submit" className={styles["vetting-button"]}>
                        Run vetting process
                        <span className={styles["vetting-button-badge"]}>
                            {selectedCriteriaCount}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VettingProcess;