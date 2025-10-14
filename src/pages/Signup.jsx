import React from "react";
import { Signup as SignupComponent } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
  const { status } = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  if (status) {
    navigate("/");
    return;
  }

  return (
    <div className="py-8">
      <SignupComponent />
    </div>
  );
}

export default Signup;
