import React, { useState } from "react";

const ServiceGroup = () => {
  const [formData, setFormData] = useState({
    Location: "",
    RevenueSystem: "",
    ServiceGroup: "",
    GroupshortName: "",
    Description: "",
    ServiceCode: "",
    ServiceName: "",
    ServiceAmount: "",
    RateEditable: false,
    IsConsultantResources: false,
    DicountApplicable: false,
    QuantityEditable: false,
    IsTaxApplicable: false,
    CPTCode: "",
    AccountInterfare: "",
    CompilaneCode1: "",
    CompilaneCode2: "",
    CompilaneCode3: "",
    ServicesLtdPerDay: "",
    WithEffectFrom: "",
    WithEffectTo: "",
    TaxPercentage: "",
    ApprovalStatus: "",
    Statuss: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 mt-4">
        <h2 className="fs-4" style={{ color: "#5E5873" }}>
          Services Group
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
            {/* Revenue System */}
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
              <label htmlFor="ServiceGroup" className="form-label">
                Service Group
              </label>
              <input
                type="text"
                className="form-control"
                id="ServiceGroup"
                name="ServiceGroup"
                value={formData.ServiceGroup}
                onChange={handleChange}
                placeholder="ServiceGroup"
              />
            </div>

            <div className="col-md">
              <label htmlFor="GroupshortName" className="form-label">
                Short Name
              </label>
              <input
                type="text"
                className="form-control"
                id="GroupshortName"
                name="GroupshortName"
                value={formData.GroupshortName}
                onChange={handleChange}
                placeholder="short Name"
              />
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
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md ">
              <label htmlFor="ServiceAmount" className="form-label">
                Service Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="ServiceAmount"
                name="ServiceAmount"
                value={formData.ServiceAmount}
                onChange={handleChange}
                placeholder="Amount"
              />
            </div>
            <div className="row gx-3 gy-3 mt-2">
              <div className="col-md ">
                <label htmlFor="ServiceName" className="form-label">
                  ServiceName
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ServiceName"
                  name="ServiceName"
                  value={formData.ServiceName}
                  onChange={handleChange}
                  placeholder="Amount"
                />
              </div>

              <div className="col-md ">
                <label htmlFor="CPTCode" className="form-label">
                  CPTCode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CPTCode"
                  name="CPTCode"
                  value={formData.CPTCode}
                  onChange={handleChange}
                  placeholder="Amount"
                />
              </div>

              <div className="col-md">
                <label htmlFor="AccountInterfare" className="form-label">
                  Account Interfare
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="AccountInterfare"
                  name="AccountInterfare"
                  placeholder="Text Field 2"
                  value={formData.AccountInterfare}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md">
                <label htmlFor="CompilaneCode1" className="form-label">
                  Compilane Code 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CompilaneCode1"
                  name="CompilaneCode1"
                  placeholder="Code 1"
                  value={formData.CompilaneCode1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md">
                <label htmlFor="CompilaneCode2" className="form-label">
                  Compilane Code 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CompilaneCode2"
                  name="CompilaneCode2"
                  placeholder="Code 2"
                  value={formData.CompilaneCode2}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md">
                <label htmlFor="CompilaneCode3" className="form-label">
                  Compilane Code 3
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="CompilaneCode3"
                  name="CompilaneCode3"
                  placeholder="Code 3"
                  value={formData.CompilaneCode3}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row gx-3 gy-3 mt-2">
              <div className="col-md">
                <label htmlFor="ServiceCode" className="form-label">
                  Service Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ServiceCode"
                  name="ServiceCode"
                  value={formData.ServiceCode}
                  onChange={handleChange}
                  placeholder="ServiceCode"
                />
              </div>
              <div className="col-md">
                <label htmlFor="TaxPercentage" className="form-label">
                  Tax Percentage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="TaxPercentage"
                  name="TaxPercentage"
                  placeholder="Tax %"
                  value={formData.TaxPercentage}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md">
                <label htmlFor="  ApprovalStatus" className="form-label">
                  Approval Status
                </label>
                <select
                  className="form-select"
                  id="ApprovalStatus"
                  name="ApprovalStatus"
                  value={formData.ApprovalStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Referred">Referred</option>
                  <option value="Direct">Direct</option>
                </select>
              </div>
              <div className="col-md">
                <label htmlFor="WithEffectFrom" className="form-label">
                  With Effect From
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="WithEffectFrom"
                  name="WithEffectFrom"
                  value={formData.WithEffectFrom}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md">
                <label htmlFor="WithEffectTo" className="form-label">
                  With Effect To
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="WithEffectTo"
                  name="WithEffectTo"
                  value={formData.WithEffectTo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md">
                <label htmlFor=" ServicesLtdPerDay" className="form-label">
                  Services Ltd/Day
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=" ServicesLtdPerDay "
                  name=" ServicesLtdPerDay  "
                  placeholder=" ServicesLtdPerDay "
                  value={formData.ServicesLtdPerDay}
                  onChange={handleChange}
                />
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
                  <label
                    htmlFor="DicountApplicable"
                    className="form-label px-2"
                  >
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

                <div className="col-md">
                  <label htmlFor="Statuss" className="form-label px-2">
                    Status
                  </label>
                  <select
                    className="form-select"
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
        </div>
      </div>
    </div>
  );
};

export default ServiceGroup;
