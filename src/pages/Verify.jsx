import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function Verify() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  async function verifyEmail() {
    try {
      if (userId && secret) {
        await authService.updateVerification({ userId, secret });
        console.log("Email verified successfully");
        navigate("/");
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  }

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-400">
          <div 
          className="absolute top-1/3 text-center mb-20 font-semibold text-lg"
          >Verifing...</div>
          <ClipLoader size={40} color="black" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Verify;
