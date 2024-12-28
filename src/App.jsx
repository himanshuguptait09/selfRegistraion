import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchOption from "./components/SelfRegistration/SearchOption";
import AppLayout from "./components/Layout/AppLayout";
import PageNotFound from "./components/HOME/Home";
import "./custom.css";
import Form from "./components/Services/Form";
import ServiceGroup from "./components/Services/ServiceGroup";
import Cities from "./components/Cities/Cities";
import AddCities from "./components/Cities/AddCities";
import EditCities from "./components/Cities/EditCities";
import Religion from "./components/Religions/Religion";
import AddReligion from "./components/Religions/AddReligion";
import EditReligion from "./components/Religions/EditReligion";
import Qualification from "./components/Qualification/Qualification";
import AddNewQualification from "./components/Qualification/AddNewQualification";
import EditQualification from "./components/Qualification/EditQualification";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <PageNotFound />,
        },
        {
          path: "/self-registration",
          element: <SearchOption />,
        },
        {
          path: "/services",
          element: <Form />,
        },
        {
          path: "/services-group",
          element: <ServiceGroup />,
        },
        {
          path: "/cities",
          element: <Cities />,
        },
        {
          path: "/cities/add-cities",
          element: <AddCities />,
        },
        {
          path: "/cities/edit-cities",
          element: <EditCities />,
        },
        {
          path: "/religion",
          element: <Religion />,
        },
        {
          path: "/religion/add-religion",
          element: <AddReligion />,
        },
        {
          path: "/religion/edit-religion",
          element: <EditReligion />,
        },
        {
          path: "/qualification",
          element: <Qualification />,
        },
        {
          path: "/qualification/add-qualification",
          element: <AddNewQualification />,
        },
        {
          path: "/qualification/edit-qualification",
          element: <EditQualification />,
        },
      ],
    },
  ]);
  return (
    <div className="body">
      <RouterProvider router={router} />;
    </div>
  );
};
export default App;
