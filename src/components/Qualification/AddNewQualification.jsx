import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addqualifications } from "../../redux/QualificationSlice";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  validateDegreeNameAndShortName,
  validateDescription,
  sanitizeInput,
  capitalizeWords,
} from "../Validation"; // Import all validation helpers
import "./custom.css";

const AddNewQualification = () => {
  const [formData, setFormData] = useState({
    Location: "",
    DegreeName: "",
    DegreeShortName: "",
    Description: "",
    Status: "Active",
  });

  const [errors, setErrors] = useState({
    Location: "",
    DegreeName: "",
    DegreeShortName: "",
    Description: "",
    Status: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = { ...errors };

    // DegreeName & DegreeShortName Validation
    if (
      formData.DegreeName &&
      !validateDegreeNameAndShortName(formData.DegreeName)
    ) {
      newErrors.DegreeName = "Invalid Degree Name.";
    } else {
      newErrors.DegreeName = ""; // Reset error if valid
    }

    if (
      formData.DegreeShortName &&
      !validateDegreeNameAndShortName(formData.DegreeShortName)
    ) {
      newErrors.DegreeShortName = "Invalid Degree Short Name.";
    } else {
      newErrors.DegreeShortName = ""; // Reset error if valid
    }

    // Description Validation
    if (formData.Description && !validateDescription(formData.Description)) {
      newErrors.Description = "Invalid Description.";
    } else {
      newErrors.Description = ""; // Reset error if valid
    }

    // Required Field Validations
    if (!formData.Location) newErrors.Location = "Location is required.";
    if (!formData.DegreeName) newErrors.DegreeName = "Degree Name is required.";
    if (!formData.DegreeShortName)
      newErrors.DegreeShortName = "Degree Short Name is required.";
    if (!formData.Description)
      newErrors.Description = "Description is required.";
    if (!formData.Status) newErrors.Status = "Status is required.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let capitalizedValue = capitalizeWords(value);
    let sanitizedValue = sanitizeInput(capitalizedValue);

    // Update formData state with sanitized capitalized value
    setFormData((prevState) => ({
      ...prevState,
      [name]: sanitizedValue,
    }));
  };

  // Handle form submission
  const handleAdd = () => {
    setSubmitted(true); // Indicate the form is being submitted

    const isValid = handleValidation(); // Validate all fields

    if (!isValid) {
      toast.current.show({
        severity: "error",
        summary: "Error!",
        detail: "Please fill all required fields correctly.",
        life: 3000,
      });
      return;
    }

    // If no errors, proceed with dispatching the qualification
    const newQualification = { ...formData };

    dispatch(addqualifications(newQualification)); // Dispatch to Redux store

    // Reset form data and submitted state
    setFormData({
      Location: "",
      DegreeName: "",
      DegreeShortName: "",
      Description: "",
      Status: "Active",
    });
    setSubmitted(false);

    // Show success toast
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Qualification added successfully.",
      life: 3000,
    });

    // Redirect to the qualifications page
    navigate("/qualification/");
  };

  return (
    <div className="container-fluid">
      <Toast ref={toast} position="top-right" />
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Add Qualifications
        </h2>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row gx-2 gy-3">
            {/* Location */}
            <div className="col-md">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <select
                className={`form-select ${
                  errors.Location
                    ? "is-invalid"
                    : formData.Location
                    ? "is-valid"
                    : ""
                }`}
                id="Location"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                title={errors.Location}
                required
              >
                <option value="">Select</option>
                <option value="Referred">Referred</option>
                <option value="Transfer">Transfer</option>
                <option value="Semi">Semi</option>
              </select>
              {/*{errors.Location && (
                <small className="invalid-feedback">{errors.Location}</small>
              )}*/}
            </div>

            {/* Degree Name */}
            <div className="col-md">
              <label htmlFor="DegreeName" className="form-label">
                Degree Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.DegreeName
                    ? "is-invalid"
                    : formData.DegreeName
                    ? "is-valid"
                    : ""
                }`}
                id="DegreeName"
                name="DegreeName"
                value={formData.DegreeName}
                onChange={handleChange}
                placeholder="Degree Name"
                required
              />
              {errors.DegreeName && (
                <small className="invalid-feedback">{errors.DegreeName}</small>
              )}
            </div>

            {/* Degree Short Name */}
            <div className="col-md">
              <label htmlFor="DegreeShortName" className="form-label">
                Degree Short Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.DegreeShortName
                    ? "is-invalid"
                    : formData.DegreeShortName
                    ? "is-valid"
                    : ""
                }`}
                id="DegreeShortName"
                name="DegreeShortName"
                value={formData.DegreeShortName}
                onChange={handleChange}
                placeholder="Degree Short Name"
                required
              />
              {errors.DegreeShortName && (
                <small className="invalid-feedback">
                  {errors.DegreeShortName}
                </small>
              )}
            </div>

            {/* Description */}
            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.Description
                    ? "is-invalid"
                    : formData.Description
                    ? "is-valid"
                    : ""
                }`}
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              {errors.Description && (
                <small className="invalid-feedback">{errors.Description}</small>
              )}
            </div>

            {/* Status */}
            <div className="col-md">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select
                id="Status"
                name="Status"
                className={`form-select ${
                  errors.Status
                    ? "is-invalid"
                    : formData.Status
                    ? "is-valid"
                    : ""
                }`}
                value={formData.Status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.Status && (
                <small className="invalid-feedback">{errors.Status}</small>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <button
                className="btn"
                style={{ backgroundColor: "#0AD8B5", color: "white" }}
                type="button"
                onClick={handleAdd}
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

export default AddNewQualification;
