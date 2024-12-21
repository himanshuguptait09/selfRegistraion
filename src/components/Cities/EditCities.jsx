import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatedcity } from "../../redux/Slice";
import { useLocation, useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InputPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditCities = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityToEdit = location.state?.location;

  const [apiCountries, setApiCountries] = useState([]);
  const [formData, setFormData] = useState({
    Country: cityToEdit?.Country || "",
    State: cityToEdit?.State || "",
    cityName: cityToEdit?.cityName || "",
    Status: cityToEdit?.Status || "Active",
  });

  const [errors, setErrors] = useState({
    Country: "",
    State: "",
    cityName: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const cityNameRegex =
    /^[A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*(?: [A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*)*$/;

  useEffect(() => {
    if (!cityToEdit) {
      navigate("/cities");
    }
  }, [cityToEdit, navigate]);

  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://www.freetestapi.com/api/v1/countries?sort=name&order=asc"
        );
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          label: country.name,
          value: country.name,
        }));
        setApiCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setApiCountries([]);
      }
    };

    fetchCountries();
  }, []);

  const handlePickerChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Country: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, Country: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const processValue = (val) => {
      const cleanedValue = val.replace(/[^a-zA-Z0-9 ,./\\()\-]/g, "");
      const capitalizedValue = cleanedValue.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      const singleSpaceValue = capitalizedValue.replace(/\s{2,}/g, " ");
      return singleSpaceValue.trim();
    };

    if (name === "cityName") {
      const formattedValue = processValue(value);
      setFormData((prev) => ({ ...prev, cityName: formattedValue }));

      // Validation for cityName
      if (formattedValue.length < 2 || formattedValue.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cityName: "Must be between 3 and 50 characters.",
        }));
      } else if (!cityNameRegex.test(formattedValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cityName:
            "Must start with a capital letter. Only one space between words, and valid special characters (, . - / ( )) are allowed.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cityName: "",
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    // Clear error for all other fields
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleUpdate = () => {
    setSubmitted(true);

    const newErrors = {};

    // Validation checks
    if (!formData.Country) {
      newErrors.Country = "This field is required.";
    }
    if (!formData.State) {
      newErrors.State = "This field is required.";
    }
    if (!formData.cityName) {
      newErrors.cityName = "This field is required.";
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      const updatedCity = { ...formData, locationId: cityToEdit?.locationId };
      dispatch(updatedcity(updatedCity));
      navigate("/cities");
    }
  };

  const renderField = (label, name, fieldType = "text") => (
    <div className="col-md position-relative">
      <label htmlFor={name}>{label}</label>
      <OverlayTrigger
        placement="bottom"
        overlay={errors[name] ? <Tooltip>{errors[name]}</Tooltip> : <></>}
      >
        <input
          type={fieldType}
          className={`form-control ${
            submitted && errors[name] ? "is-invalid" : ""
          }`}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
        />
      </OverlayTrigger>
    </div>
  );

  const renderSelectField = (label, name, options) => (
    <div className="col-md position-relative">
      <label htmlFor={name}>{label}</label>
      <OverlayTrigger
        placement="bottom"
        overlay={errors[name] ? <Tooltip>{errors[name]}</Tooltip> : <></>}
      >
        <select
          id={name}
          name={name}
          className={`form-select ${
            submitted && errors[name] ? "is-invalid" : ""
          }`}
          value={formData[name]}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </OverlayTrigger>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Edit Cities
        </h2>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row gx-2 gy-3">
            <div className="col-md position-relative">
              <label htmlFor="Country">Country</label>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  errors.Country ? <Tooltip>{errors.Country}</Tooltip> : <></>
                }
              >
                <div>
                  <InputPicker
                    size="lg"
                    placeholder="Select"
                    data={apiCountries}
                    value={formData.Country}
                    onChange={handlePickerChange}
                    style={{ width: "100%" }}
                    className={`${
                      submitted && errors.Country ? "is-invalid" : ""
                    }`}
                  />
                </div>
              </OverlayTrigger>
            </div>
            {/* Other Fields */}
            {renderSelectField("State", "State", [
              "new delhi",
              "mumbai",
              "chennai",
              "Direct",
            ])}
            {renderField("City Name", "cityName")}
            <div className="col-md">
              <label htmlFor="Status">Status</label>
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
                type="button"
                className="btn btn-primary mt-3"
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

export default EditCities;
