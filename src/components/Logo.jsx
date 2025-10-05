import React from "react";
import logo from "./../asset/logo.png";
function Logo({ width }) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width: width || "150px" }} />
    </div>
  );
}

export default Logo;
