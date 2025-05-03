// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "../features/auth/SignUpPage";
import SignInPage from "../features/auth/SignInPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateTeacherPage from "../features/teacher/CreateTeacherPage";
import CreateEducationCenterPage from "../features/educationCenter/CreateEducationCenterPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/create-teacher"
          element={
            <ProtectedRoute>
              <CreateTeacherPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-education-center"
          element={
            <ProtectedRoute>
              <CreateEducationCenterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
