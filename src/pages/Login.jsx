import React from "react";
import { Login as LoginComponent } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const { status } = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  if (status) {
    navigate("/");
    return;
  }

  return (
    <div className="py-8">
      <LoginComponent />
    </div>
  );
}

export default Login;
