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
