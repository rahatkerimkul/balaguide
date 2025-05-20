// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "../features/auth/SignUpPage"; //just Sign up page
import SignInPage from "../features/auth/SignInPage"; //just Sign in page
import ProtectedRoute from "../components/ProtectedRoute"; // If token is not empty it gives access to dashboard and other pages
import CreateTeacherPage from "../features/teacher/CreateTeacherPage"; //to create Teacher
import CreateEducationCenterPage from "../features/educationCenter/CreateEducationCenterPage"; // to create education center
import DashboardLayout from "../layouts/DashboardLayout"; //all dashboards are rendered by this
import LandingPage from "../features/landing/LandingPage";
import DashboardHome from "../pages/DashboardHome"; //after signing in person will see this page
import GroupsPage from "../pages/GroupsPage"; //after signing in
import CreateCoursePage from "../pages/CreateCoursePage"; //after signing in
import Logout from "../pages/logout";
import EducationCenterDashboard from "../features/educationCenter/EducationCenterDashboard";
import CreateGroupPage from "../pages/CreateGroupPage";
import GroupDetailsPage from "../pages/GroupDetailsPage";
import CoursesPage from "../pages/CoursesPage";
import TeachersPage from "../pages/TeachersPage";
import CreateTeacherPage2 from "../pages/CreateTeacherPage";
import CreateSchedulePage from "../pages/CreateSchedulePage";
import GroupSchedulePage from "../pages/GroupSchedulePage";
import AllSchedulesPage from "../pages/AllSchedulesPage";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-teacher" element={<CreateTeacherPage />} />
        <Route
          path="/education-center/dashboard"
          element={<EducationCenterDashboard />}
        />
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
          path="/create-group"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateGroupPage />
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
          path="/groups/:id/schedule"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GroupSchedulePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-teacher2"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateTeacherPage2 />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AllSchedulesPage />
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
          path="/courses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CoursesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-schedule"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CreateSchedulePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GroupDetailsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TeachersPage />
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
