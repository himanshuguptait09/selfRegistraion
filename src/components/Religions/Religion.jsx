import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Paginator } from "primereact/paginator";
const Religion = () => {
  const [formData, setFormData] = useState({
    Location: "",
    Religion: "",
    Status: "Active",
  });
  const locations = useSelector((state) => state.cities.locations);
  const filteredLocations = useSelector(
    (state) => state.cities.filteredLocations
  );
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const locationsToDisplay =
    filteredLocations.length > 0 ? filteredLocations : locations;

  const totalRecords = locationsToDisplay.length;

  const paginatedLocations = useMemo(() => {
    return locationsToDisplay.slice(first, first + rows);
  }, [locationsToDisplay, first, rows]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4 " style={{ color: "#5E5873" }}>
          Religion
        </h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/religion/add-religion"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
      </div>

      {/* Search Form */}
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
                <option value="Refferd">Refferd</option>
                <option value="Transfer">Transfer</option>
                <option value="Semi">Semi</option>
              </select>
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
                //onClick={filterLocations}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        <h4 className="table-header p-3 fs-5">List of Cities</h4>
        <div className="table-responsive">
          <table className="table table-info table-striped text-center table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Country</th>
                <th>State</th>
                <th>City Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLocations.length > 0 ? (
                paginatedLocations.map((location, index) => (
                  <tr key={location.locationId}>
                    <td>{first + index + 1}</td>
                    <td>{location.Country}</td>
                    <td>{location.State}</td>
                    <td>{location.cityName}</td>
                    <td>{location.Status}</td>
                    <td>
                      <Link
                        to="/religion/edit-religion"
                        state={{ location }}
                        className="custom-link text-decoration-none"
                      >
                        <MdPreview size={25} />
                      </Link>
                      <span className="ms-2 me-2 mb-2 text-secondary opacity-75">
                        |
                      </span>
                      <Link
                        to="/religion/edit-religion"
                        //state={{ location }}
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
                    No Locations Found
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

export default Religion;
