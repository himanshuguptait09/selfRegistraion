import React, { useState } from "react";
// import { FaSyncAlt } from "react-icons/fa"; // Importing the refresh icon from react-icons
import { IoMdRefresh } from "react-icons/io";
import { tableData } from "./constant";

const SearchOption = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [trNo, setTrNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [registrationType, setRegistrationType] = useState(""); // Registration Type as select

  const [filteredData, setFilteredData] = useState(tableData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Calculate pagination values

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = () => {
    const formatDateToDDMMYY = (date) => {
      const [day, month, year] = date.split("-");
      return `${day}${month}${year.slice(-2)}`;
    };

    const filtered = tableData.filter((row) => {
      const rowDateFormatted = formatDateToDDMMYY(row.registrationDate);
      const fromFormatted = fromDate
        ? formatDateToDDMMYY(
            new Date(fromDate).toLocaleDateString("en-GB").replace(/\//g, "-")
          )
        : null;
      const toFormatted = toDate
        ? formatDateToDDMMYY(
            new Date(toDate).toLocaleDateString("en-GB").replace(/\//g, "-")
          )
        : null;

      const matchesFromDate =
        !fromFormatted || rowDateFormatted >= fromFormatted;
      const matchesToDate = !toFormatted || rowDateFormatted <= toFormatted;
      const matchesPatientName =
        !patientName ||
        row.patientName.toLowerCase().includes(patientName.toLowerCase());
      const matchesTrNo =
        !trNo || row.trNo.toLowerCase().includes(trNo.toLowerCase());
      const matchesMobileNumber =
        !mobileNumber ||
        row.mobileNo.toLowerCase().includes(mobileNumber.toLowerCase());
      const matchesRegistrationType =
        !registrationType ||
        (row.registrationType &&
          row.registrationType
            .toLowerCase()
            .includes(registrationType.toLowerCase()));

      return (
        matchesFromDate &&
        matchesToDate &&
        matchesPatientName &&
        matchesTrNo &&
        matchesMobileNumber &&
        matchesRegistrationType
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setPatientName("");
    setTrNo("");
    setMobileNumber("");
    setRegistrationType("");
    setFilteredData(tableData); // Reset the data to original table data
  };

  const handlePrint = (row) => {
    setSelectedRow(row);
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRow(null); // Clear selected row when modal is closed
  };

  const handlePrintDetails = () => {
    const modalContent = document.querySelector(".modal-content");
    if (!modalContent) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Modal</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .table {
              wSnoth: 100%;
              border-collapse: collapse;
            }
            .table, .table th, .table td {
              border: 1px solSno #ccc;
            }
            .table th, .table td {
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          ${modalContent.innerHTML}
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  // Input fields configuration
  const inputFields = [
    {
      label: "From Date",
      type: "date",
      value: fromDate,
      setter: setFromDate,
    },
    {
      label: "To Date",
      type: "date",
      value: toDate,
      setter: setToDate,
    },
    {
      label: "Patient Name",
      type: "text",
      value: patientName,
      setter: setPatientName,
      Placeholder: "Patient Name",
    },
    {
      label: "TR No.",
      type: "text",
      value: trNo,
      setter: setTrNo,
      Placeholder: "TR No",
    },
    {
      label: "Mobile No.",
      type: "text",
      value: mobileNumber,
      setter: setMobileNumber,
      Placeholder: "Mobile No.",
    },
    {
      label: "Registration Type",
      type: "select",
      value: registrationType,
      setter: setRegistrationType,
      options: ["select", "New", "Existing"],
    },
  ];

  return (
    <section>
      <div className="container-fluid">
        {/* Header */}
        <div className="breadcrumb-header ms-1 me-1 mt-4">
          <h2 className="fs-4 " style={{ color: "#5E5873" }}>
            Self Registration
          </h2>
        </div>
        {/* Search Form */}
        <div className="card border-0 rounded shadow-lg ms-1 me-1">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              {inputFields.map((field, index) => (
                <div className="col-md-2" key={index}>
                  <label className="form-label">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      className="form-control"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                    >
                      {field.options.map((option, Snox) => (
                        <option key={Snox} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      value={field.value}
                      placeholder={field.Placeholder}
                      onChange={(e) => field.setter(e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Search and Refresh Buttons */}
            <div className="row mt-3">
              <div className="col-12 ">
                <button
                  className="btn "
                  style={{ backgroundColor: "#0AD8B5", color: "white" }}
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="btn ms-2"
                  style={{ backgroundColor: "#BB2D3B", color: "white" }}
                  type="button"
                  onClick={handleRefresh}
                >
                  <IoMdRefresh size={16} /> {/* Refresh Icon */}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
          <h4 className="table-header p-3 fs-5" style={{ color: "#4959A6" }}>
            Self Registration List
          </h4>
          <div className="table-responsive">
            <table className="table table-info table-striped text-start table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Registration Date</th>
                  <th>TR No</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Mobile No</th>
                  <th>Uploaded Documents</th>
                  <th>CONVERTED TO CR NO.</th> 
                  <th>CR No.</th>
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row, index) => (
                    <tr key={row.Sno}>
                      <td className="p-3">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center">{row.registrationDate}</td>
                      <td>{row.trNo}</td>
                      <td>{row.patientName}</td>
                      <td>{row.age}</td>
                      <td>{row.gender}</td>
                      <td>{row.mobileNo}</td>
                      <td>
                        <a
                          href="#"
                          className="text-decoration-none"
                          style={{ color: "#7A73EF" }}
                        >
                          {row.document}
                        </a>
                      </td>
                      <td>{row.registrationType}</td>{" "}
                     
                      <td>{row.crNo}</td>
                      <td>
                        <a
                          href="#"
                          className="text-decoration-none"
                          onClick={() => handlePrint(row)}
                        >
                          Print
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No Results Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3 mb-2">
            <button
              style={{ border: "none" }}
              className="btn me-2"
              // style={{ backgroundColor: "#0AD8B5", color: "white" }}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &laquo;&laquo;
            </button>
            <button
              style={{ border: "none" }}
              className="btn me-2"
              // style={{ backgroundColor: "#0AD8B5", color: "white" }}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &lsaquo;
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`btn me-2 ${
                  currentPage === index + 1 ? "btn-primary" : ""
                }`}
                style={{
                  border: "none",
                  backgroundColor: currentPage === index + 1 ? "" : "white",
                  color: currentPage === index + 1 ? "white" : "black",
                }}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              style={{ border: "none" }}
              className="btn me-2"
              // style={{ backgroundColor: "#0AD8B5", color: "white" }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &rsaquo;
            </button>
            <button
              style={{ border: "none" }}
              className="btn"
              // style={{ backgroundColor: "#0AD8B5", color: "white" }}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &raquo;&raquo;
            </button>
          </div>
        </div>
        {/* Modal for Printing */}
        {showModal && selectedRow && (
          <>
            <div
              className="modal-backdrop opacity-75"
              onClick={handleCloseModal}
            ></div>
            <div
              className="modal"
              tabIndex="-1"
              style={{ display: "flex ", alignItems: "center" }}
            >
              {/* <div className="modal" tabIndex="-1" style={{ display: "block" }}> */}
              <div className="modal-dialog " style={{ width: "75%" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Print Details</h5>
                  </div>

                  <div className="modal-body">
                    <table className="table table-bordered">
                      <tbody>
                        {selectedRow &&
                          Object.entries(selectedRow).map(([key, value]) => (
                            <tr key={key}>
                              <td>
                                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                              </td>
                              <td>{value}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handlePrintDetails}
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchOption;
