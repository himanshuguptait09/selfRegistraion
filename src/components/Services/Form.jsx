import React, { useRef, useState } from "react";
import { InputPicker } from "rsuite";
import { CiCircleInfo } from "react-icons/ci";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "primereact/toast";
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
    Status: "Active",
    GroupHead: "",
  });

  const [errors, setErrors] = useState({
    GroupName: "",
    GroupshortName: "",
    Description: "",
  });

  const nameValidationRegex =
    /^[A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*(?: [A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*)*$/;
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(false);

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
        } else if (!nameValidationRegex.test(formattedValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              "Must start with a capital letter. Only one space between words, and valid special characters (, . - / ( )) are allowed.",
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
  const toast = useRef(null);

  const handleSave = () => {
    setSubmitted(true);

    // Basic validation check
    const newErrors = { ...errors };
    if (!formData.GroupName) newErrors.GroupName = "This field is required.";
    if (!formData.GroupshortName)
      newErrors.GroupshortName = "This field is required.";
    if (!formData.Description)
      newErrors.Description = "This field is required.";

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      // If no errors, show success toast
      toast.current.show({
        severity: "success",
        summary: "Saved Successfully",
        detail: "Saved successfully!",
        life: 3000, // Toast disappears after 3 seconds
      });

      // Reset form (optional)
      setFormData({
        Location: "",
        RevenueSystem: "",
        GroupName: "",
        GroupshortName: "",
        Description: "",
        Status: "Active",
        GroupHead: "",
      });
      setSubmitted(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Alert!",
        detail: "Please fill all required feild",
        life: 3000,
      });
    }
  };

  return (
    <div className="container-fluid">
      <Toast ref={toast} position="top-right" />
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
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.GroupName ? "error" : ""
                  }`}
                  id="GroupName"
                  name="GroupName"
                  value={formData.GroupName}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    errors.GroupName ? (
                      <Tooltip>{errors.GroupName}</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                  trigger={["hover", "focus"]}
                  // show={submitted && errors.GroupName}
                >
                  <span
                    className={`input-icon ${
                      errors.GroupName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
            </div>

            <div className="col-md">
              <label htmlFor="GroupshortName" className="form-label">
                Short Name
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.GroupshortName ? "error" : ""
                  }`}
                  id="GroupshortName"
                  name="GroupshortName"
                  value={formData.GroupshortName}
                  onChange={handleChange}
                  placeholder="Short Name"
                />
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    errors.GroupshortName ? (
                      <Tooltip>{errors.GroupshortName}</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                  trigger={["hover", "focus"]}
                >
                  <span
                    className={`input-icon ${
                      submitted && errors.GroupName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
            </div>

            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.Description ? "error" : ""
                  }`}
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    errors.GroupName ? (
                      <Tooltip>{errors.GroupName}</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                  trigger={["hover", "focus"]}
                >
                  <span
                    className={`input-icon ${
                      submitted && errors.GroupName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
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
            <div className="col-12">
              <button
                className="btn"
                style={{ backgroundColor: "#0AD8B5", color: "white" }}
                type="button"
                onClick={handleSave}
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
