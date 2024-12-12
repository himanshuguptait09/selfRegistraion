import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchOption from "./components/SelfRegistration/SearchOption";
import AppLayout from "./components/Layout/AppLayout";
import PageNotFound from "./components/HOME/Home";
import "./custom.css";
import Form from "./components/Services/Form";
import ServiceGroup from "./components/Services/ServiceGroup";

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
          element: <ServiceGroup/>,
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
