import React from "react";
import { ClipLoader } from "react-spinners";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  isLoading = false,
  ...props
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader
            size={20}
            color="black"
          />
        </div>
      ) : (
        <button
          className={`px-4 py-2 rounded ${bgColor} ${textColor} ${className}`}
          type={type}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
