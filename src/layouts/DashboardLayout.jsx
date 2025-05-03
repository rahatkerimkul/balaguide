// src/layouts/DashboardLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getRole } from "../utils/storage";
const DashboardLayout = ({ children }) => {
  const role = getRole();
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout" style={{ display: "flex" }}>
      <Sidebar role={role} />
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
