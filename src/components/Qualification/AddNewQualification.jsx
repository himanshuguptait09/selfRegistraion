import React, { useRef, useState } from "react";
//import OverlayTrigger from "react-bootstrap/OverlayTrigger";
//import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { addqualifications } from "../../redux/QualificationSlice";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitted(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setSubmitted(true);
    const newErrors = { ...errors };
    if (!formData.Location) newErrors.Location = "This field is required.";
    if (!formData.DegreeName) newErrors.DegreeName = "This field is required.";
    if (!formData.DegreeShortName)
      newErrors.DegreeShortName = "This field is required.";
    if (!formData.Description)
      newErrors.Description = "This field is required.";
    if (!formData.Status) newErrors.Status = "This field is required.";

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.current.show({
        severity: "error",
        summary: "Alert!",
        detail: "Please fill all required fields.",
        life: 3000,
      });
      return;
    }

    const newqualifications = {
      Location: formData.Location,
      DegreeName: formData.DegreeName,
      DegreeShortName: formData.DegreeShortName,
      Description: formData.Description,
      Status: formData.Status,
    };

    dispatch(addqualifications(newqualifications));
    setFormData({
      Location: "",
      DegreeName: "",
      DegreeShortName: "",
      Description: "",
      Status: "Active",
    });

    setSubmitted(false);
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Religion added successfully.",
      life: 3000,
    });
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
                <option value="Transfer">Transfer</option>
                <option value="Semi">Semi</option>
              </select>
              {errors.Location && (
                <small className="text-danger">{errors.Location}</small>
              )}
            </div>
            <div className="col-md">
              <label htmlFor="DegreeName" className="form-label">
                Degree Name
              </label>
              <select
                className="form-select"
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
              {errors.DegreeName && (
                <small className="text-danger">{errors.DegreeName}</small>
              )}
            </div>
            <div className="col-md">
              <label htmlFor="DegreeShortName" className="form-label">
                Degree ShortName
              </label>
              <input
                type="text"
                className="form-control"
                id="DegreeShortName"
                name="DegreeShortName"
                value={formData.DegreeShortName}
                onChange={handleChange}
                placeholder="Name"
              />
              {errors.DegreeShortName && (
                <small className="text-danger">{errors.DegreeShortName}</small>
              )}
            </div>
            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
              />
              {errors.Description && (
                <small className="text-danger">{errors.Description}</small>
              )}
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
                <option value="Inactive">Inactive</option>
              </select>
              {errors.Status && (
                <small className="text-danger">{errors.Status}</small>
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
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewQualification;
