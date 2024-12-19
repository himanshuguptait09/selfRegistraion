import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing dispatch
import { InputPicker } from "rsuite";
import { CiCircleInfo } from "react-icons/ci";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import { addCity } from "../../redux/Slice"; // Import the action

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

  const dispatch = useDispatch(); // Setting up dispatch
  const data = useSelector((state) => state.cities.newdata); // Setting up dispatch
  console.log(data);

  // Input validation regex
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

    switch (name) {
      case "CityName": {
        const formattedValue = processValue(value);
        setFormData((prev) => ({ ...prev, [name]: formattedValue }));

        // Validation for CityName
        if (formattedValue.length < 2 || formattedValue.length > 50) {
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
      default:
        setFormData((prev) => ({ ...prev, [name]: value }));
        break;
    }
  };

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

  const handlePickerChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      Country: value,
    }));
  };

  // Add city handler
  const handleAdd = () => {
    setSubmitted(true);

    // Basic validation
    const newErrors = { ...errors };
    if (!formData.Country) newErrors.Country = "This field is required.";
    if (!formData.State) newErrors.State = "This field is required.";
    if (!formData.CityName) newErrors.CityName = "This field is required.";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      // Dispatch action to add city to Redux store
      dispatch(addCity(formData));

      // Reset the form data and errors after successful add
      setFormData({
        Country: "",
        State: "",
        CityName: "",
        Status: "Active",
      });
      setSubmitted(false); // Reset submission state
    }
  };
  console.log(formData);

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4 " style={{ color: "#5E5873" }}>
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
              <InputPicker
                size="lg"
                placeholder={loadingCountries ? "Loading..." : "Select"}
                data={countries}
                value={formData.Country}
                onChange={handlePickerChange}
                disabled={loadingCountries}
                style={{ width: "100%" }}
                className={`form-select ${
                  submitted && errors.Country ? "error" : ""
                }`}
              />
            </div>
            <div className="col-md">
              <label htmlFor="State" className="form-label">
                State
              </label>
              <select
                className={`form-select ${
                  submitted && errors.State ? "error" : ""
                }`}
                id="State"
                name="State"
                value={formData.State}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Referred">new delhi</option>
                <option value="Direct">mumbai</option>
                <option value="Referred">chennai</option>
                <option value="Referred">new delhi</option>
                <option value="Direct">Direct</option>
              </select>
            </div>
            <div className="col-md">
              <label htmlFor="CityName" className="form-label">
                City Name
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.CityName ? "error" : ""
                  }`}
                  id="CityName"
                  name="CityName"
                  value={formData.CityName}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    errors.CityName ? (
                      <Tooltip>{errors.CityName}</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                  trigger={["hover", "focus"]}
                >
                  <span
                    className={`input-icon ${
                      errors.CityName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
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
