import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedqualifications } from "../../redux/QualificationSlice";
import {
  validateDegreeNameAndShortName,
  validateDescription,
  capitalizeWords,
  sanitizeInput,
} from "../Validation"; // Importing validation helpers

const EditQualification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qualificationToEdit = location.state?.qualification;
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
  const toast = useRef(null);

  useEffect(() => {
    if (qualificationToEdit) {
      setFormData({
        Location: qualificationToEdit.Location || "",
        DegreeName: qualificationToEdit.DegreeName || "",
        DegreeShortName: qualificationToEdit.DegreeShortName || "",
        Description: qualificationToEdit.Description || "",
        Status: qualificationToEdit.Status || "Active",
      });
    }
  }, [qualificationToEdit]);

  // Validation function for fields
  const handleValidation = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.Location) newErrors.Location = "This field is required.";
    if (!formData.DegreeName) newErrors.DegreeName = "This field is required.";
    if (!formData.DegreeShortName) newErrors.DegreeShortName = "This field is required.";
    if (!formData.Description) newErrors.Description = "This field is required.";
    if (!formData.Status) newErrors.Status = "This field is required.";

    // Validate DegreeName and DegreeShortName (you can add more complex logic)
    if (formData.DegreeName && !validateDegreeNameAndShortName(formData.DegreeName)) {
      newErrors.DegreeName = "Invalid Degree Name.";
    }
    if (formData.DegreeShortName && !validateDegreeNameAndShortName(formData.DegreeShortName)) {
      newErrors.DegreeShortName = "Invalid Degree Short Name.";
    }
    
    // Validate Description (custom logic)
    if (formData.Description && !validateDescription(formData.Description)) {
      newErrors.Description = "Invalid Description.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).length === 0;
  };

  // Handle field change with sanitization and capitalization
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalize words and sanitize input before setting
    const capitalizedValue = capitalizeWords(value);
    const sanitizedValue = sanitizeInput(capitalizedValue);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    
    // Reset error for the changed field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle form update submission
  const handleUpdate = () => {
    const isValid = handleValidation(); // Validate form on update

    if (!isValid) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all required fields correctly.",
        life: 3000,
      });
      return;
    }

    const updatedQualificationData = {
      ...formData,
      locationId: qualificationToEdit?.locationId, // Maintain original ID for update
    };

    dispatch(updatedqualifications(updatedQualificationData)); // Dispatch update
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Qualification updated successfully",
      life: 3000,
    });
    navigate("/qualification");
  };

  return (
    <div className="container-fluid">
      <Toast ref={toast} position="top-right" />
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Edit Qualification
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
                className={`form-select ${errors.Location ? "is-invalid" : formData.Location ? "is-valid" : ""}`}
                id="Location"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Referred">Referred</option>
                <option value="Transfer">Transfer</option>
                <option value="Semi">Semi</option>
              </select>
              {errors.Location && <small className="text-danger">{errors.Location}</small>}
            </div>

            <div className="col-md">
              <label htmlFor="DegreeName" className="form-label">
                Degree Name
              </label>
              <select
                className={`form-select ${errors.DegreeName ? "is-invalid" : formData.DegreeName ? "is-valid" : ""}`}
                id="DegreeName"
                name="DegreeName"
                value={formData.DegreeName}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
              </select>
              {errors.DegreeName && <small className="text-danger">{errors.DegreeName}</small>}
            </div>

            <div className="col-md">
              <label htmlFor="DegreeShortName" className="form-label">
                Degree Short Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.DegreeShortName ? "is-invalid" : formData.DegreeShortName ? "is-valid" : ""}`}
                id="DegreeShortName"
                name="DegreeShortName"
                value={formData.DegreeShortName}
                onChange={handleChange}
                placeholder="Degree Short Name"
              />
              {errors.DegreeShortName && <small className="text-danger">{errors.DegreeShortName}</small>}
            </div>

            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className={`form-control ${errors.Description ? "is-invalid" : formData.Description ? "is-valid" : ""}`}
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
              />
              {errors.Description && <small className="text-danger">{errors.Description}</small>}
            </div>

            <div className="col-md">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select
                id="Status"
                name="Status"
                className={`form-select ${errors.Status ? "is-invalid" : formData.Status ? "is-valid" : ""}`}
                value={formData.Status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.Status && <small className="text-danger">{errors.Status}</small>}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <button
                className="btn"
                style={{ backgroundColor: "#0AD8B5", color: "white" }}
                type="button"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQualification;
