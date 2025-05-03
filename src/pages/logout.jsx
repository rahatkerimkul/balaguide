// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../utils/storage";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuth();
    toast.info("You’ve been logged out.");
    navigate("/signin");
  }, [navigate]);

  return null; // no UI needed
};

export default Logout;
