import React from "react";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await authService.logout();
      navigate("/login");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <button className="" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutBtn;
