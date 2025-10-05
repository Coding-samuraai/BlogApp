import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";
import { ClipLoader } from "react-spinners";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  async function checkUserAuthentication() {
    try {
      const user = await authService.getCurrentUser();

      if (user) {
        dispatch(login({ userData: user }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-400">
      <ClipLoader size={40} color="black" />
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-400">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
