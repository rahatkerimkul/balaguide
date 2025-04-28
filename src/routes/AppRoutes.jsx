// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "../features/auth/SignUpPage";
import SignInPage from "../features/auth/SignInPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
