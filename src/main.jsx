import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import routing from "../src/Routing";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routing}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
);
