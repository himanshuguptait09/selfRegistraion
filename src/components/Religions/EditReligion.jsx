import React, { useRef, useState, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedReligion } from "../../redux/ReligionSlice";

const EditReligion = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const religionToEdit = location.state?.religion;
  const [formData, setFormData] = useState({
    Location: "",
    Religion: "",
    Status: "Active",
  });
  const [errors, setErrors] = useState({
    Location: "",
    Religion: "",
    Status: "",
  });

  useEffect(() => {
    if (religionToEdit) {
      setFormData({
        Location: religionToEdit.Location || "",
        Religion: religionToEdit.Religion || "",
        Status: religionToEdit.Status || "Active",
      });
    }
  }, [religionToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" })); 
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toast = useRef(null);

  const handleUpdate = () => {
    const newErrors = {};

    // Validation checks
    if (!formData.Location) {
      newErrors.Location = "This field is required.";
    }
    if (!formData.Religion) {
      newErrors.Religion = "This field is required.";
    }
    if (!formData.Status) {
      newErrors.Status = "This field is required.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      const updatedReligionData = {
        ...formData,
        locationId: religionToEdit?.locationId,
      };
      dispatch(updatedReligion(updatedReligionData));
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Religion updated successfully",
        life: 3000,
      });
      navigate("/religion");
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
              <label htmlFor="Religion" className="form-label">
                Religion
              </label>
              <select
                className="form-select"
                id="Religion"
                name="Religion"
                value={formData.Religion}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
              </select>
              {errors.Religion && (
                <small className="text-danger">{errors.Religion}</small>
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
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReligion;
