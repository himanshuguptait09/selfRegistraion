import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const ServiceGroup = () => {
  const [formData, setFormData] = useState({
    Location: "",
    RevenueSystem: "",
    ServiceGroup: "",
    GroupshortName: "",
    Description: "",
    ServiceAmount: "",
    ServiceName: "",
    CPTCode: "",
    AccountInterfare: "",
    CompilaneCode1: "",
    CompilaneCode2: "",
    CompilaneCode3: "",
    ServiceCode: "",
    TaxPercentage: "",
    ApprovalStatus: "",
    WithEffectFrom: "",
    WithEffectTo: "",
    ServicesLtdPerDay: "",

    RateEditable: false,
    IsConsultantResources: false,
    IsTaxApplicable: false,
    DicountApplicable: false,
    QuantityEditable: false,

    Statuss: "",
  });
  const [errors, setErrors] = useState({
    ServiceGroup: "",
    GroupshortName: "",
    Description: "",
    ServiceName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const nameValidationRegex =
    /^[A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*(?: [A-Z][a-zA-Z0-9]*(?:[ ,./\\()\-]?[A-Za-z0-9]+)*)*$/;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    const processValue = (value) => {
      const cleanedValue = value.replace(/[^a-zA-Z0-9 ,./\\()\-]/g, "");
      const capitalizedValue = cleanedValue.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      const singleSpaceValue = capitalizedValue.replace(/\s{2,}/g, " ");
      const trimmedValue = singleSpaceValue.trim();
      return trimmedValue;
    };
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitted(false);
    switch (name) {
      case "ServiceGroup":
      case "GroupshortName":
      case "ServiceName": {
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

        if (formattedValue.length < 2 || formattedValue.length > 250) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            Description: "Must be between 2 and 250 characters.",
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
  const handleSave = () => {
    setSubmitted(true);

    const newErrors = { ...errors };
    if (!formData.ServiceGroup)
      newErrors.ServiceGroup = "This field is required.";
    if (!formData.GroupshortName)
      newErrors.GroupshortName = "This field is requiredss.";
    // if (!formData.Description)
    //   newErrors.Description = "This field is required.";
    if (!formData.ServiceName)
      newErrors.ServiceName = "This field is required.";
    if (!formData.ServiceAmount)
      newErrors.ServiceAmount =
        "This field is required.and takes mininum value is 0";

    setErrors(newErrors);
  };
  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 mt-4">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Services Group
        </h2>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1 mb-2">
        <div className="card-body">
          <div className="row gx-3 gy-3">
            <div className="col-md">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <select
                className={`form-select ${
                  submitted && errors.ServiceName ? "error" : ""
                }`}
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
                className={`form-select ${
                  submitted && errors.ServiceName ? "error" : ""
                }`}
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
              <label htmlFor="ServiceGroup" className="form-label">
                Service Group
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.ServiceGroup ? "error" : ""
                  }`}
                  id="ServiceGroup"
                  name="ServiceGroup"
                  value={formData.ServiceGroup}
                  onChange={handleChange}
                  placeholder="ServiceGroup"
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
                      errors.ServiceGroup ? "error-icon" : ""
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
                  placeholder="short Name"
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
                  // show={submitted && errors.GroupName}
                >
                  <span
                    className={`input-icon ${
                      errors.GroupshortName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-md-2">
              <label htmlFor="Statuss" className="form-label px-2">
                Status
              </label>
              <select
                className={`form-select ${
                  submitted && errors.ServiceName ? "error" : ""
                }`}
                id="Statuss"
                name="Statuss"
                value={formData.Statuss}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Referred">Referred</option>
                <option value="Direct">Direct</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row gx-3 gy-3">
            <div className="col-md">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="Description"
                  name="Description"
                  placeholder="Description"
                  value={formData.Description}
                  onChange={handleChange}
                />
                {/* <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>{errors.Description}</Tooltip>}
                  show={submitted && errors.Description}
                >
                  <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger> */}
              </div>
            </div>
            <div className="col-md ">
              <label htmlFor="ServiceName" className="form-label">
                Service Name
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className={`form-control ${
                    submitted && errors.ServiceName ? "error" : ""
                  }`}
                  id="ServiceName"
                  name="ServiceName"
                  value={formData.ServiceName}
                  onChange={handleChange}
                  placeholder="Service Name"
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
                  // show={submitted && errors.GroupName}
                >
                  <span
                    className={`input-icon ${
                      errors.ServiceName ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-md">
              <label htmlFor="ServiceAmount" className="form-label">
                Service Amount
              </label>
              <div className="input-container position-relative">
                <input
                  type="number"
                  className={`form-control ${
                    submitted && errors.ServiceAmount ? "error" : ""
                  }`}
                  id="GroupshortName"
                  name="GroupshortName"
                  value={formData.ServiceAmount}
                  onChange={handleChange}
                  placeholder="short Name"
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
                  // show={submitted && errors.GroupName}
                >
                  <span
                    className={`input-icon ${
                      errors.ServiceAmount ? "error-icon" : ""
                    }`}
                  >
                    <CiCircleInfo size={20} />
                  </span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="col-md ">
              <label htmlFor="CPTCode" className="form-label">
                CPTCode
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="CPTCode"
                  name="CPTCode"
                  value={formData.CPTCode}
                  onChange={handleChange}
                  placeholder="Amount"
                />
                {/* <span className="input-icon">
                  <CiCircleInfo size={20} />
                </span> */}
              </div>
            </div>
            <div className="col-md">
              <label htmlFor="AccountInterfare" className="form-label">
                Account Interfare
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="AccountInterfare"
                  name="AccountInterfare"
                  placeholder="Text Field 2"
                  value={formData.AccountInterfare}
                  onChange={handleChange}
                />
                {/* <span className="input-icon">
                  <CiCircleInfo size={20} />
                </span> */}
              </div>
            </div>
            <div className="col-md">
              <label htmlFor="ServicesLtdPerDay" className="form-label">
                Services Ltd/Day
              </label>
              <div className="input-container position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="ServicesLtdPerDay"
                  name="ServicesLtdPerDay"
                  placeholder="Services/Day"
                  value={formData.ServicesLtdPerDay}
                  onChange={handleChange}
                />
                {/* <span className="input-icon">
                  <CiCircleInfo size={20} />
                </span> */}
              </div>
            </div>
            <div className="row gx-2 gy-3 mt-2">
              <div className="col-md">
                <label htmlFor="CompilaneCode1" className="form-label">
                  Compilane Code 1
                </label>
                <div className="input-container position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="CompilaneCode1"
                    name="CompilaneCode1"
                    placeholder="Code 1"
                    value={formData.CompilaneCode1}
                    onChange={handleChange}
                  />
                  {/* <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span> */}
                </div>
              </div>
              <div className="col-md">
                <label htmlFor="CompilaneCode2" className="form-label">
                  Compilane Code 2
                </label>
                <div className="input-container position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="CompilaneCode2"
                    name="CompilaneCode2"
                    placeholder="Code 2"
                    value={formData.CompilaneCode2}
                    onChange={handleChange}
                  />
                  {/* <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span> */}
                </div>
              </div>
              <div className="col-md">
                <label htmlFor="CompilaneCode3" className="form-label">
                  Compilane Code 3
                </label>
                <div className="input-container position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="CompilaneCode3"
                    name="CompilaneCode3"
                    placeholder="Code 3"
                    value={formData.CompilaneCode3}
                    onChange={handleChange}
                  />
                  {/* <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span> */}
                </div>
              </div>
              <div className="col-md">
                <label htmlFor="ServiceCode" className="form-label">
                  Service Code
                </label>
                <div className="input-container position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="ServiceCode"
                    name="ServiceCode"
                    value={formData.ServiceCode}
                    onChange={handleChange}
                    placeholder="ServiceCode"
                  />
                  {/* <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span> */}
                </div>
              </div>
              <div className="col-md">
                <label htmlFor="TaxPercentage" className="form-label">
                  Tax Percentage
                </label>
                <div className="input-container position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="TaxPercentage"
                    name="TaxPercentage"
                    placeholder="Tax %"
                    value={formData.TaxPercentage}
                    onChange={handleChange}
                  />
                  {/* <span className="input-icon">
                    <CiCircleInfo size={20} />
                  </span> */}
                </div>
              </div>
            </div>
            <div className="row gx-2 gy-3 mt-2 text-start ">
              <div className="col-md  ">
                <label htmlFor="RateEditable" className="form-label px-2">
                  Rate Editable
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="RateEditable"
                  value={formData.RateEditable}
                  onChange={handleChange}
                  name="RateEditable"
                  style={{ outline: "red" }}
                />
              </div>
              <div className="col-md">
                <label
                  htmlFor=" IsConsultantResources"
                  className="form-label px-2"
                >
                  Consult Resource
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="IsConsultantResources"
                  value={formData.IsConsultantResources}
                  onChange={handleChange}
                  name="IsConsultantResources"
                />
              </div>
              <div className="col-md ">
                <label htmlFor="IsTaxApplicable" className="form-label px-2">
                  IsTaxApplicable
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="IsTaxApplicable"
                  value={formData.IsTaxApplicable}
                  onChange={handleChange}
                  name="IsTaxApplicable"
                />
              </div>
              <div className="col-md">
                <label htmlFor="DicountApplicable" className="form-label px-2">
                  Dicount Applicable
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="DicountApplicable"
                  value={formData.DicountApplicable}
                  onChange={handleChange}
                  name="DicountApplicable"
                />
              </div>
              <div className="col-md">
                <label htmlFor="QuantityEditable" className="form-label px-2">
                  Quantity Editable
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="QuantityEditable"
                  value={formData.QuantityEditable}
                  onChange={handleChange}
                  name="QuantityEditable"
                />
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
      </div>
    </div>
  );
};

export default ServiceGroup;
