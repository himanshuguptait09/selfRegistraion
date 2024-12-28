import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedqualifications } from "../../redux/QualificationSlice";
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = () => {
    const newErrors = {};

    // Validation checks
    if (!formData.Location) {
      newErrors.Location = "This field is required.";
    }
    if (!formData.DegreeName) {
      newErrors.DegreeName = "This field is required.";
    }
    if (!formData.DegreeShortName) {
      newErrors.DegreeShortName = "This field is required.";
    }
    if (!formData.Description) {
      newErrors.Description = "This field is required.";
    }
    if (!formData.Status) {
      newErrors.Status = "This field is required.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      const updatedqualificationData = {
        ...formData,
        locationId: qualificationToEdit?.locationId,
      };
      dispatch(updatedqualifications(updatedqualificationData));
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Religion updated successfully",
        life: 3000,
      });
      navigate("/qualification");
    }
  };
  return (
    <div className="container-fluid">
      <Toast ref={toast} position="top-right" />
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Edit Religion
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
                onClick={handleUpdate}
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

export default EditQualification;
