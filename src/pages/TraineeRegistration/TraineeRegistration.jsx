import { useForm } from "react-hook-form";
import styles from "./TraineeRegistration.module.scss";

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
  // @ts-ignore
  const onSubmit = (data) => console.log(data);

  // Watching for checkbox values
  const watchOntarioProgram = watch("ontarioProgram", false);
  const watchSinDeclaration = watch("sinDeclaration", false);

  return (
    <div className={styles["trainee-main-content"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        {/* Header Section */}
        <div className={styles["header-section"]}>
          <div className={styles["header-title"]}>
            <h1 className={styles["form-title"]}>Registration</h1>
            <span className={styles["cohort-tag"]}>Cohort 4</span>
          </div>
          <p className={styles["lorem-text"]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Personal Information */}
        <h2 className={styles["mini-title"]}>Personal Information</h2>
        <hr />

        <div className={styles["two-column"]}>
          <div className={styles["left-column"]}>
            <h3 className={styles["section-title"]}>Gouvernement ID and Names</h3>

            <div className={styles["field-group"]}>
              <label>First Name</label>
              <input
                {...register("firstName")}
                className={styles["input"]}
                placeholder="First name"
              />
            </div>

            <div className={styles["field-group"]}>
              <label>Middle Name</label>
              <input
                {...register("middleName")}
                className={styles["input"]}
                placeholder="Middle name"
              />
            </div>

            <div className={styles["field-group"]}>
              <label>Last Name</label>
              <input
                {...register("lastName")}
                className={styles["input"]}
                placeholder="Last name"
              />
            </div>

            <div className={styles["field-group"]}>
              <h3 className={styles["section-title"]}>Where you live in Ontario</h3>
              <label>Select a location</label>
              <select {...register("city")} className={styles["input"] + " " + styles["custom-select"]}>
                <option value="">Select a city</option>
                {citiesInOntario.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["right-column"]}>
            <h3 className={styles["section-title"]}>Contact Information</h3>

            <div className={styles["field-group"]}>
              <label>Email</label>
              <input
                type="email"
                {...register("email")}
                className={styles["input"]}
                placeholder="email address"
              />
            </div>

            <div className={styles["field-group"]}>
              <label>Contact Number</label>
              <input
                {...register("contactNumber")}
                className={styles["input"]}
                placeholder="Tel #"
              />
            </div>

            <div className={styles["field-group"] + " " + styles["last-field-group"]}>
              <h3 className={styles["section-title"]}>When where you born?</h3>
              <label>Select your date of birth</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className={styles["input"]}
              />
            </div>
          </div>
        </div>

        {/* Social Medias*/}
        <h3 className={styles["mini-title"]}>Social Media</h3>
        <hr />

        <div className={styles["two-column"]}>
          <div className={styles["left-column"]}>
            <div className={styles["field-group"]}>
              <label>LinkedIn</label>
              <input
                {...register("LinkedIn")}
                className={styles["input"]}
                placeholder="url..."
              />
            </div>

            <div className={styles["field-group"]}>
              <label>Instagram</label>
              <input
                {...register("Instagram")}
                className={styles["input"]}
                placeholder="url"
              />
            </div>
          </div>
          <div className={styles["right-column"]}>
            <div className={styles["field-group"]}>
              <label>Facebook</label>
              <input
                {...register("LinkedIn")}
                className={styles["input"]}
                placeholder="url..."
              />
            </div>

            <div className={styles["field-group"]}>
              <label>TikTok</label>
              <input
                {...register("Instagram")}
                className={styles["input"]}
                placeholder="url"
              />
            </div>
          </div>
        </div>

        {/* Identity and Demographics */}
        <h3 className={styles["mini-title"]}>Identity and Demographics</h3>
        <hr />

        <div className={styles["two-column"]}>
          <div className={styles["left-column"]}>
            <div className={styles["field-group"]}>
              <label>What is your gender?</label>
              <select {...register("gender")} className={styles["input"] + " " + styles["custom-select"]}>
                <option value="">Select</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Two spirit">Two Spirit</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles["field-group"]}>
              <label>What is your immigration status?</label>
              <select
                {...register("immigrationStatus")}
                className={styles["input"] + " " + styles["custom-select"]}
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

          <div className={styles["right-column"]}>
            <div className={styles["field-group"]}>
              <label>What is your ethnicity?</label>
              <select
                {...register("ethnicity")}
                className={styles["input"] + " " + styles["custom-select"]}
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
        <h3 className={styles["mini-title"]}>Justice System & Program History</h3>
        <hr />

        <div className={styles["two-column"]}>
          <div className={styles["left-column"]}>
            <h3 className={styles["section-title"]}>Ontario Programs</h3>
            <label className={styles["checkbox-label"]}>
              <input type="checkbox" {...register("ontarioProgram")} />
              <span className={styles["check-text"]}>
                I have been attending a program funded by the Government of
                Ontario
              </span>
            </label>

            {watchOntarioProgram && (
              <div className={styles["field-group"]}>
                <label>Select Year</label>
                <select {...register("ontarioYear")} className={styles["input"]}>
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

          <div className={styles["right-column"]}>
            <h3 className={styles["next-line"]}>Justice System</h3>
            <div className={styles["checkbox-wrapper"]}>
              <input type="checkbox" {...register("justiceSystem")} />
              <label className={styles["justice-label"]}>
                I have been involved with the justice system
              </label>
            </div>
          </div>
        </div>

        {/* Financial and Employment Information */}
        <h3 className={styles["mini-title"]}>Financial and Employment Information</h3>
        <hr />

        <div className={styles["two-column"]}>
          <div className={styles["left-column"]}>
            <label className={styles["label-status"]}>Employment Status</label>
            <div className={styles["field-group"]}>
              <select
                {...register("employmentStatus")}
                className={styles["input"] + " " + styles["custom-select"]}
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

          <div className={styles["right-column"]}>
            <h3 className={styles["section-title"]}>SIN Declaration</h3>
            <div className={styles["checkbox-wrapper"]}>
              <input type="checkbox" {...register("sinDeclaration")} />
              <label className={styles["justice-label"]}>
                I have a social insurance number
              </label>
            </div>

            {watchSinDeclaration && (
              <div className={styles["field-group"]}>
                <label>Enter your SIN</label>
                <input
                  placeholder="Social Insurance Number"
                  {...register("sinNumber")}
                  className={styles["input"]}
                />
              </div>
            )}
          </div>
        </div>

        <hr />
        <button type="submit" className={styles["submit-btn"]}>
          Submit
        </button>
      </form>
    </div>
  );
}