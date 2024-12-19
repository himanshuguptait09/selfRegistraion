import React, { useEffect, useState, useMemo } from "react";
import { InputPicker } from "rsuite";
import { Paginator } from "primereact/paginator";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCity, filterCities } from "../../redux/Slice";

const Cities = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Country: "",
    State: "",
    CityName: "",
    Status: "Active", // Default
  });

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);


  // Fetch country data from API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await fetch(
          "https://www.freetestapi.com/api/v1/countries?sort=name&order=asc"
        );
        const data = await response.json();
        // Transform data to fit InputPicker format
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePickerChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      Country: value,
    }));
  };

  const locations = useSelector((state) => state.cities.locations); // Access cities from Redux
  const filteredLocations = useSelector(
    (state) => state.cities.filteredLocations
  ); // Filtered locations from Redux

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const paginatedLocations = useMemo(() => {
    return filteredLocations.slice(first, first + rows);
  }, [filteredLocations, first, rows]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filterLocations = () => {
    dispatch(filterCities(formData)); // Dispatch filter action from Redux
    setFirst(0);
  };
  console.log(locations)

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4 " style={{ color: "#5E5873" }}>
          Cities
        </h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/cities/add-cities"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
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
              />
            </div>
            <div className="col-md">
              <label htmlFor="State" className="form-label">
                State
              </label>
              <select
                className="form-select"
                id="State"
                name="State"
                value={formData.State}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="new delhi">new delhi</option>
                <option value="mumbai">mumbai</option>
                <option value="chennai">chennai</option>
              </select>
            </div>
            <div className="col-md">
              <label htmlFor="CityName" className="form-label">
                City Name
              </label>
              <input
                type="text"
                className="form-control"
                id="CityName"
                name="CityName"
                value={formData.CityName}
                onChange={handleChange}
                placeholder="Name"
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
                onClick={filterLocations}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
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
                    <td>{location.status}</td>
                    <td>
                      <Link
                        to={`/locations/edit-location/${location.locationId}`}
                        state={{ location }}
                        className="custom-link text-decoration-none"
                      >
                        Edit
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
            totalRecords={filteredLocations.length}
            onPageChange={onPageChange}
            className="custom-paginator"
          />
        </div>
      </div>
    </div>
  );
};

export default Cities;
