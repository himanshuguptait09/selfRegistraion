import React, { useState } from "react";
import { InputPicker } from "rsuite";
// import "./Form.css";
import { CiCircleInfo } from "react-icons/ci";

const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const Form = () => {
  const [formData, setFormData] = useState({
    Location: "",
    RevenueSystem: "",
    GroupName: "",
    GroupshortName: "",
    Description: "",
    Status: "Active", // Default
    GroupHead: "",
  });
  
  const [errors, setErrors] = useState({
    GroupName: "",
    GroupshortName: "",
    Description: "",
  });

  const nameValidationRegex =
    /^[A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*(?: [A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*)*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processValue = (value) => {
      const cleanedValue = value.replace(/[^a-zA-Z0-9 ,./\\()\-]/g, "");

      const capitalizedValue = cleanedValue.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      const singleSpaceValue = capitalizedValue.replace(/\s{2,}/g, " ");

      const trimmedValue = singleSpaceValue.trim();

      return trimmedValue;
    };

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (/^[^a-zA-Z]/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Cannot start with a special character or number.",
      }));
      return;
    }
    switch (name) {
      case "GroupName":
      case "GroupshortName": {
        const formattedValue = processValue(value);
        setFormData((prev) => ({ ...prev, [name]: formattedValue }));

        if (formattedValue.length < 3 || formattedValue.length > 50) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Must be between 3 and 50 characters.",
          }));
        } else if (/^[^a-zA-Z]/.test(formattedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Cannot start with a special character or number.",
          }));
        } else if (!nameValidationRegex.test(formattedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              "Must start with a capital letter. Only one space between words, and only valid special characters (, . - / ( )) are allowed.",
          }));
        }
        break;
      }

      case "Description": {
        const formattedValue = processValue(value);
        setFormData((prev) => ({ ...prev, Description: formattedValue }));

        if (formattedValue.length < 3 || formattedValue.length > 500) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            Description: "Must be between 3 and 500 characters.",
          }));
        } else if (/\s{2,}/.test(formattedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            Description: "Only one space is allowed between words.",
          }));
        } else if (formattedValue.length !== value.length) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            Description:
              "Special characters and multiple spaces are automatically corrected.",
          }));
        }
        break;
      }
      default: {
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
      }
    }
  };

  const handlePickerChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      GroupHead: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 mt-4">
        <h2 className="fs-4 " style={{ color: "#5E5873" }}>
          Services
        </h2>
      </div>

      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row gx-2 gy-3">
            <div className="col-md">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <select
                className="form-select"
                id="Location"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Referred">Referred</option>
                <option value="Direct">Direct</option>
              </select>
            </div>

            <div className="col-md">
              <label htmlFor="RevenueSystem" className="form-label">
                Revenue System
              </label>
              <select
                className="form-select"
                id="RevenueSystem"
                name="RevenueSystem"
                value={formData.RevenueSystem}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Referred">Referred</option>
                <option value="Direct">Direct</option>
              </select>
            </div>

            <div className="col-md">
              <label htmlFor="GroupName" className="form-label">
                Name
              </label>
              <div className="input-container">
                <input
                  type="text"
                  className="form-control"
                  id="GroupName"
                  name="GroupName"
                  value={formData.GroupName}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <CiCircleInfo className="input-icon" size={20} />
              </div>
              {errors.GroupName && (
                <div className="text-danger">{errors.GroupName}</div>
              )}
            </div>

            <div className="col-md">
              <label htmlFor="GroupshortName" className="form-label">
                Short Name
              </label>
              <div className="input-container">
                <CiCircleInfo className="input-icon" size={20} />
                <input
                  type="text"
                  className="form-control"
                  id="GroupshortName"
                  name="GroupshortName"
                  value={formData.GroupshortName}
                  onChange={handleChange}
                  placeholder="Short Name"
                />
              </div>
              {errors.GroupshortName && (
                <div className="text-danger">{errors.GroupshortName}</div>
              )}
            </div>
            {/* Description */}
            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <div className="input-container">
                <CiCircleInfo className="input-icon" size={20} />
                <input
                  type="text"
                  className="form-control"
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
              {errors.Description && (
                <div className="text-danger">{errors.Description}</div>
              )}
            </div>

            <div className="col-md">
              <label htmlFor="GroupHead" className="form-label">
                Group Head
              </label>
              <InputPicker
                size="lg"
                placeholder="Select"
                data={data}
                value={formData.GroupHead}
                onChange={handlePickerChange}
                style={{ width: "100%" }}
              />
            </div>

            <div className="col-md">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select
                id="Status"
                name="Status"
                className="form-select"
                value={formData.Status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Cash">Cash</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 ">
              <button
                className="btn "
                style={{ backgroundColor: "#0AD8B5", color: "white" }}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
