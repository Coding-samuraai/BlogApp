import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/index";
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
    <div>loading...</div>
  ) : (
    <div className="h-screen w-screen flex justify-center bg-gray-400">
      <div className="h-full w-full flex-col justify-between block ">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
