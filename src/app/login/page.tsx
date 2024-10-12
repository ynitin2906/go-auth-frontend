"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const { login, isAuthenticated } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true to check auth state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading to true when form is submitted

    if (!loginCredential.email || !loginCredential.password) {
      setError("Please enter all required fields");
      setIsLoading(false);
      return;
    }

    try {
      await login(loginCredential.email, loginCredential.password);
    } catch (error) {
      console.log(error);
      setError("Invalid credentials");
      setIsLoading(false); // Stop loading if login fails
    }
  };

  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredential({
      ...loginCredential,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true); // Keep loading until redirect
      router.push(`/profile`); // Redirect after successful login
    } else {
      setIsLoading(false); // Stop loading if user is not authenticated
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center items-center">
          {/* Loader UI */}
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={loginCredential.email}
              onChange={handleLoginData}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={loginCredential.password}
              onChange={handleLoginData}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={isLoading} // Disable button when loading
          >
            Login
          </button>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
