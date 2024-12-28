import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import { filterqualifications } from "../../redux/QualificationSlice";
import { FaEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";

const Qualification = () => {
  const dispatch = useDispatch();
  const qualifications = useSelector((state) => state.qualifications);
  const [formData, setFormData] = useState({
    Location: "",
    DegreeName: "",
    DegreeShortName: "",
    Description: "",
    Status: "Active",
  });
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const qualificationsToDisplay =
    qualifications.filteredqualifications.length > 0
      ? qualifications.filteredqualifications
      : qualifications.qualifications;

  const totalRecords = qualificationsToDisplay.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSearch = () => {
    dispatch(filterqualifications(formData));
    setFirst(0);
  };
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedqualifications = useMemo(() => {
    return qualificationsToDisplay.slice(first, first + rows);
  }, [qualificationsToDisplay, first, rows]);
  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4 " style={{ color: "#5E5873" }}>
          Qualification
        </h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/qualification/add-qualification"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
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
                onClick={handleSearch} // Trigger filter action
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        <h4 className="table-header p-3 fs-5">List of Religions</h4>
        <div className="table-responsive">
          <table className="table table-info table-striped text-center table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Location</th>
                <th>DegreeName: </th>
                <th>DegreeShortName: </th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedqualifications.length > 0 ? (
                paginatedqualifications.map((qualification, index) => (
                  <tr key={qualification.qualificationId}>
                    <td>{index + 1}</td>
                    <td>{qualification.Location}</td>
                    <td>{qualification.DegreeName}</td>
                    <td>{qualification.DegreeShortName}</td>
                    <td>{qualification.Description}</td>
                    <td>{qualification.Status}</td>
                    <td>
                      <Link
                        to="/qualification/show-qualification"
                        state={{ qualification }}
                        className="custom-link text-decoration-none"
                      >
                        <MdPreview size={25} />
                      </Link>
                      <span className="ms-2 me-2 mb-2 text-secondary opacity-75">
                        |
                      </span>
                      <Link
                        to="/qualification/edit-qualification"
                        state={{ qualification }}
                        className="custom-link text-decoration-none"
                      >
                        <FaEdit size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Religions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            className="custom-paginator"
          />
        </div>
      </div>
    </div>
  );
};

export default Qualification;
