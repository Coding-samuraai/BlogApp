import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Input } from "../components/index";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Logo } from "../components/index";
import { generateRandomColor } from "../helpers/ColorHelper";
import service from "../appwrite/config";

function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  async function signup(data) {
    setError("");
    try {
      setLoading(true);
      // Create user account
      const userData = await authService.createAccount(data);

      if (userData) {
        // Generate a random color for the user avatar
        let color = generateRandomColor();

        // Store user preference in a separate table
        const preferences = { avatarColor: color };

        // Automatically log in the user after successful signup
        const session = await authService.login(data);

        // Save preferences to the database
        const result = await service.saveUserPreferences({
          userId: userData.$id,
          preferences,
        });
        // Check if saving preferences was successful
        if (!result) {
          console.error("Failed to save user preferences");
        }

        // Check if login was successful
        if (!session) {
          setError("Login failed after signup. Please try logging in.");
          return;
        }

        dispatch(
          login({
            userData,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create account. Please check your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full" isLoading={loading}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
