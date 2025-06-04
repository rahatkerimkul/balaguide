// src/layouts/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { getUser } from "../utils/storage";

const Sidebar = ({ role }) => {
  const menuItems = [
    { to: "/dashboard", label: "📊 Dashboard" },
    { to: "/groups", label: "👥 Groups" },
  ];

  if (role === "EDUCATION_CENTER") {
    menuItems.push(
      { to: "/courses", label: "📚 Courses" },
      { to: "/create-course", label: "➕ Create Course" },
      { to: "/teachers", label: "🧑‍🏫 Teachers" },
      { to: "/create-teacher2", label: "➕ Create Teacher" },
      { to: "/attendance-reports", label: "📈 Attendance Reports" }
    );
  } else if (role === "TEACHER") {
    menuItems.push(
      { to: "/my-courses", label: "📚 My Courses" },
      { to: "/attendance", label: "📝 Attendance / Marks" }
    );
  }

  menuItems.push(
    { to: "/schedules", label: "📅 Schedule" },
    { to: "/settings", label: "⚙️ Settings" },
    { to: "/logout", label: "🚪 Logout" }
  );

  const user = getUser();
  const userName = user?.firstName || user?.name || "User";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>{role === "TEACHER" ? `👨‍🏫 ${userName}` : `🏫 ${userName}`}</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
