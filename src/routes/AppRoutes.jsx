// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "../features/auth/SignUpPage"; //just Sign up page
import SignInPage from "../features/auth/SignInPage"; //just Sign in page
import ProtectedRoute from "../components/ProtectedRoute"; // If token is not empty it gives access to dashboard and other pages
import CreateTeacherPage from "../features/teacher/CreateTeacherPage"; //to create Teacher
import CreateEducationCenterPage from "../features/educationCenter/CreateEducationCenterPage"; // to create education center
import DashboardLayout from "../layouts/DashboardLayout"; //all dashboards are rendered by this

import DashboardHome from "../pages/DashboardHome"; //after signing in person will see this page
import GroupsPage from "../pages/GroupsPage"; //after signing in
import CreateCoursePage from "../pages/CreateCoursePage"; //after signing in
import ManageTeachersPage from "../pages/ManageTeachersPage"; //after signing in
import Logout from "../pages/logout";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-teacher" element={<CreateTeacherPage />} />
        <Route
          path="/create-education-center"
          element={<CreateEducationCenterPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GroupsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateCoursePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-teachers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ManageTeachersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
