import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputPicker } from "rsuite";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { addCity } from "../../redux/Slice";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const AddCities = () => {
  const [formData, setFormData] = useState({
    Country: "",
    State: "",
    CityName: "",
    Status: "Active", // Default
  });
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [errors, setErrors] = useState({
    Country: "",
    State: "",
    CityName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.cities.newdata);

  const nameValidationRegex =
    /^[A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*(?: [A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*)*$/;

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch(
          "https://www.freetestapi.com/api/v1/countries?sort=name&order=asc"
        );
        const data = await response.json();
        const transformedData = data.map((country) => ({
          label: country.name,
          value: country.name,
        }));
        setCountries(transformedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

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
    setSubmitted(false); // Reset submitted state when user starts editing

    if (name === "CityName") {
      const formattedValue = processValue(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));

      // Validation Rules
      if (formattedValue.length < 3 || formattedValue.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "City Name must be between 3 and 50 characters.",
        }));
      } else if (!nameValidationRegex.test(formattedValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            "City Name must start with a capital letter. Only one space between words, and valid special characters (, . - / ( )) are allowed.",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePickerChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      Country: value,
    }));
  };
  const handleAdd = () => {
    setSubmitted(true);

    const newErrors = { ...errors };
    if (!formData.Country) newErrors.Country = "This field is required.";
    if (!formData.State) newErrors.State = "This field is required.";
    if (!formData.CityName) newErrors.CityName = "This field is required.";

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

    dispatch(addCity(formData));
    setFormData({
      Country: "",
      State: "",
      CityName: "",
      Status: "Active",
    });

    setSubmitted(false);
    navigate("/cities");
  };

  return (
    <div className="container-fluid">
      <Toast ref={toast} position="top-right" />
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Add Cities
        </h2>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row gx-2 gy-3">
            <div className="col-md">
              <label htmlFor="Country" className="form-label">
                Country
              </label>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  submitted && errors.Country ? (
                    <Tooltip>{errors.Country}</Tooltip>
                  ) : (
                    <></>
                  )
                }
              >
                <div>
                  <InputPicker
                    size="lg"
                    placeholder={loadingCountries ? "Loading..." : "Select"}
                    data={countries}
                    value={formData.Country}
                    onChange={handlePickerChange}
                    disabled={loadingCountries}
                    style={{
                      width: "100%",
                      borderColor:
                        submitted && errors.Country ? "red" : "default",
                    }}
                    className={`${
                      submitted && errors.Country ? "is-invalid" : ""
                    }`}
                  />
                </div>
              </OverlayTrigger>
            </div>

            <div className="col-md">
              <label htmlFor="State">State</label>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  submitted && errors.State ? (
                    <Tooltip>{errors.State}</Tooltip>
                  ) : (
                    <></>
                  )
                }
              >
                <select
                  id="State"
                  name="State"
                  className={`form-select ${
                    submitted && errors.State ? "is-invalid" : ""
                  }`}
                  value={formData.State}
                  onChange={handleChange}
                  style={{ marginTop: "9px" }}
                >
                  <option value="">Select</option>
                  <option value="new delhi">New Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                </select>
              </OverlayTrigger>
            </div>

            <div className="col-md">
              <label htmlFor="CityName" className="form-label">
                City Name
              </label>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  submitted && errors.CityName ? (
                    <Tooltip>{errors.CityName}</Tooltip>
                  ) : (
                    <></>
                  )
                }
              >
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.CityName ? "is-invalid" : ""
                  }`}
                  id="CityName"
                  name="CityName"
                  value={formData.CityName}
                  onChange={handleChange}
                  placeholder="City Name"
                />
              </OverlayTrigger>
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

export default AddCities;
