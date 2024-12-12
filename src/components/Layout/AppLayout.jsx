/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// import UserLogo from "/assets/user.jpg"
import { FaPowerOff, FaHospitalUser, FaUserClock } from "react-icons/fa";
import { FaUserDoctor, FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { CgRecord } from "react-icons/cg";
import Footer from "../Footer/Footer";
import { MdOutlineAppRegistration } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDesignServices } from "react-icons/md";
import { GrServices } from "react-icons/gr";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {};
  const offcanvasRef = useRef(null);

  const closeOffcanvas = () => {
    if (offcanvasRef.current) {
      // eslint-disable-next-line no-undef
      const offcanvas = new bootstrap.Offcanvas(offcanvasRef.current);
      offcanvas.hide();
    }
  };
  return (
    <div className="d-flex w-100 min-vh-100">
      {/* Sidebar for larger screens */}
      <div
        id="sidebar"
        className={`d-none d-lg-block ${
          sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
        style={{
          width: sidebarOpen ? "16.25rem" : "4.2rem",
          transition: "0.2s",
        }}
      >
        <div
          className="position-fixed vh-100"
          style={{
            backgroundColor: "#0a5353",
            width: sidebarOpen ? "16.25rem" : "4.2rem",
            transition: "0.2s",
          }}
        >
          <div
            className="p-3 gap-5 d-flex mt-2 justify-content-center"
            style={{ color: "#0AD8B5" }}
          >
            {sidebarOpen && (
              <h2 className="fw-semibold fs-5">Patient Portal</h2>
            )}
            <CgRecord
              style={{ height: "1.5rem", width: "1.4rem", cursor: "pointer" }}
              onClick={toggleSidebar}
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleSidebar}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="mb-2"
              style={{
                cursor: "pointer"
              }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg> */}
          </div>
          <ul className="nav flex-column mt-2">
            <li className="nav-item">
              <NavLink
                to="/locations"
                className="nav-link text-white d-flex align-items-center"
              >
                <FaLocationDot className="icon" />
                {sidebarOpen && <span className="ms-2">Locations</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/location-mapping"
                className="nav-link text-white d-flex align-items-center"
              >
                <FaMapLocationDot className="icon" />
                {sidebarOpen && <span className="ms-2">Locations Mapping</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/department-list"
                className="nav-link text-white d-flex align-items-center"
              >
                <FaHospitalUser className="icon" />
                {sidebarOpen && <span className="ms-2">Departments</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/clinican-list"
                className="nav-link text-white d-flex align-items-center"
              >
                <FaUserDoctor className="icon" />
                {sidebarOpen && <span className="ms-2">Clinicians</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/duty-roster"
                className="nav-link text-white d-flex align-items-center"
              >
                <FaUserClock className="icon" />
                {sidebarOpen && <span className="ms-2">Duty Rosters</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/self-registration"
                className="nav-link text-white d-flex align-items-center"
              >
                <MdOutlineAppRegistration className="icon" />
                {sidebarOpen && <span className="ms-2">Self Registration</span>}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/services"
                className="nav-link text-white d-flex align-items-center"
              >
                <MdDesignServices AppRegistration className="icon" />
                {sidebarOpen && <span className="ms-2">Services</span>}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/services-group"
                className="nav-link text-white d-flex align-items-center"
              >
                <GrServices AppRegistration className="icon" />
                {sidebarOpen && <span className="ms-2">Services Group</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* Off-canvas Sidebar */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        style={{ backgroundColor: "#0a5353", width: "14rem" }}
        tabIndex={-1}
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header justify-content-between align-items-center mt-1">
          <h2 className="fw-semibold fs-5" style={{ color: "#0AD8B5" }}>
            Patient Portal
          </h2>
          <RxCross2
            className="custom-link mb-2"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            title="Close Menu"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        </div>

        <div className="offcanvas-body p-0 mt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/locations"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaLocationDot className="me-3" /> Locations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/location-mapping"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaMapLocationDot className="me-3" /> Location Mapping
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/department-list"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaHospitalUser className="me-3" /> Departments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/clinican-list"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaUserDoctor className="me-3" /> Clinicians
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/duty-roster"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaUserClock className="me-3" /> Duty Rosters
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/selfregistration"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <FaUserClock className="me-3" /> Self Registration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/services"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <MdDesignServices className="me-3" /> Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/services-group"
                className="nav-link text-white d-flex align-items-center"
                onClick={closeOffcanvas}
              >
                <GrServices className="me-3" /> Services Group
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-100 d-flex flex-column">
        <div className="header-background-color sticky-top ps-2 pe-2">
          <header className="navbar-header py-2 mt-3 d-flex justify-content-between align-items-center rounded shadow">
            <button
              className="btn d-lg-none text-light border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar"
              title="Toggle Sidebar"
            >
              <RxHamburgerMenu
                className="text-white"
                style={{ height: "1.5rem", width: "1.5rem" }}
              />
            </button>

            <div className="d-flex align-items-center ms-auto position-relative">
              <button
                className="btn border-0 align-items-center"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
              >
                <FaUserCircle
                  className="cursor-pointer border-0 rounded-circle text-white"
                  style={{ height: "2.4rem", width: "2.4rem" }}
                  alt="User Icon"
                />

                {/* <img src={UserLogo} className="cursor-pointer border-0 rounded-circle text-white me-1"
                  style={{ height: "2.4rem", width: "2.4rem" }}
                  alt="User Icon" /> */}

                {/* <span className="mt-4 position-absolute end-0 me-3 rounded-circle border" style={{ background: '#28c76f', height: '0.6rem', width: '0.6rem' }}></span> */}
              </button>
              <ul
                className="dropdown-menu rounded border-0 mt-2"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="custom-logout">
                  <button
                    className="dropdown-item fw-semibold"
                    onClick={handleLogout}
                  >
                    <FaPowerOff className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </header>
        </div>

        <main className="flex-grow-1 ms-2 me-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
