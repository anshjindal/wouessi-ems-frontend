import { useForm } from "react-hook-form";
import styles from "./TraineeRegistration.module.scss"
const traineeCohorts = ["Cohort 1", "Cohort 2", "Cohort 3", "Cohort 4"];
const citiesInOntario = [
  "Toronto",
  "Ottawa",
  "Hamilton",
  "London",
  "Windsor",
  "Mississauga",
];
const years = ["2020", "2021", "2022", "2023", "2024", "2025"];
const ethnicities = ["Black", "White", "Asian", "Indigenous", "Other"];
const immigrationStatuses = [
  "Student visa",
  "Permanent Resident",
  "Citizen",
  "Other",
];
const employmentStatuses = [
  "Employed",
  "Unemployed",
  "Self-Employed",
  "Student",
];

export default function TraineeRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // Watching for checkbox values
  const watchOntarioProgram = watch("ontarioProgram", false);
  const watchSinDeclaration = watch("sinDeclaration", false);

  return (
    <div className="trainee-main-content">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-title">
            <h1 className="form-title">Registration</h1>
            <span className="cohort-tag">Cohort 4</span>
          </div>
          <p className="lorem-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Personal Information */}
        <h2 className="mini-title">Personal Information</h2>
        <hr />

        <div className="two-column">
          {/* Left side: Government ID and Names */}
          <div className="left-column">
            <h3 className="section-title">Gouvernement ID and Names</h3>

            <div className="field-group ">
              <label>First Name</label>
              <input
                {...register("firstName")}
                className="input"
                placeholder="First name"
              />
            </div>

            <div className="field-group">
              <label>Middle Name</label>
              <input
                {...register("middleName")}
                className="input"
                placeholder="Middle name"
              />
            </div>

            <div className="field-group">
              <label>Last Name</label>
              <input
                {...register("lastName")}
                className="input"
                placeholder="Last name"
              />
            </div>

            <div className="field-group">
              <h3 className="section-title">Where you live in Ontario</h3>
              <label>Select a location</label>
              <select {...register("city")} className="input custom-select">
                <option value="">Select a city</option>
                {citiesInOntario.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right side: Contact Information */}
          <div className="right-column">
            <h3 className="section-title">Contact Information</h3>

            <div className="field-group">
              <label>Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="email address"
              />
            </div>

            <div className="field-group">
              <label>Contact Number</label>
              <input
                {...register("contactNumber")}
                className="input"
                placeholder="Tel #"
              />
            </div>

            <div className="field-group last-field-group">
              <h3 className="section-title">When where you born?</h3>
              <label>Select your date of birth</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Social Medias*/}
        <h3 className="mini-title">Social Media</h3>
        <hr />

        <div className="two-column">
          <div className="left-column">
            <div className="field-group">
              <label>LinkedIn</label>
              <input
                {...register("LinkedIn")}
                className="input"
                placeholder="url..."
              />
            </div>

            <div className="field-group">
              <label>Instagram</label>
              <input
                {...register("Instagram")}
                className="input"
                placeholder="url"
              />
            </div>
          </div>
          <div className="right-column">
            <div className="field-group">
              <label>Facebook</label>
              <input
                {...register("LinkedIn")}
                className="input"
                placeholder="url..."
              />
            </div>

            <div className="field-group">
              <label>TikTok</label>
              <input
                {...register("Instagram")}
                className="input"
                placeholder="url"
              />
            </div>
          </div>
        </div>

        {/* Identity and Demographics */}
        <h3 className="mini-title">Identity and Demographics</h3>
        <hr />

        <div className="two-column">
          <div className="left-column">
            <div className="field-group">
              <label>What is your gender?</label>
              <select {...register("gender")} className="input custom-select">
                <option value="">Select</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Two spirit">Two Spirit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="field-group">
              <label>What is your immigration status?</label>
              <select
                {...register("immigrationStatus")}
                className="input custom-select"
              >
                <option value="">Select</option>
                {immigrationStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="right-column">
            <div className="field-group">
              <label>What is your ethnicity?</label>
              <select
                {...register("ethnicity")}
                className="input custom-select"
              >
                <option value="">Select</option>
                {ethnicities.map((ethnicity) => (
                  <option key={ethnicity} value={ethnicity}>
                    {ethnicity}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Justice System and Program History */}
        <h3 className="mini-title">Justice System & Program History</h3>
        <hr />

        <div className="two-column">
          <div className="left-column">
            <h3 className="section-title">Ontario Programs</h3>
            <label className="checkbox-label">
              <input type="checkbox" {...register("ontarioProgram")} />
              <span className="check-text">
                I have been attending a program funded by the Government of
                Ontario
              </span>
            </label>

            {watchOntarioProgram && (
              <div className="field-group">
                <label>Select Year</label>
                <select {...register("ontarioYear")} className="input">
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="right-column">
            <h3 className="next-line">Justice System</h3>
            <div className="checkbox-wrapper">
              <input type="checkbox" {...register("justiceSystem")} />
              <label className="justice-label">
                I have been involved with the justice system
              </label>
            </div>
          </div>
        </div>

        {/* Financial and Employment Information */}
        <h3 className="mini-title">Financial and Employment Information</h3>
        <hr />

        <div className="two-column">
          <div className="left-column">
            <label className="label-status">Employment Status</label>
            <div className="field-group">
              <select
                {...register("employmentStatus")}
                className="input custom-select"
              >
                <option value="">Select</option>
                {employmentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="right-column">
            <h3 className="section-title">SIN Declaration</h3>
            <div className="checkbox-wrapper">
              <input type="checkbox" {...register("sinDeclaration")} />
              <label className="justice-label">
                I have a social insurance number
              </label>
            </div>

            {watchSinDeclaration && (
              <div className="field-group">
                <label>Enter your SIN</label>
                <input
                  placeholder="Social Insurance Number"
                  {...register("sinNumber")}
                  className="input"
                />
              </div>
            )}
          </div>
        </div>

        <hr />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
