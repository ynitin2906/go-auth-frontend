"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
// import { useAppSelector } from "../store/hooks";

const SignupForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  // const { user } = useAppSelector((state) => state.user);
  // console.log(user);

  const [signUpCredential, setSignUpCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (
      !signUpCredential.email ||
      !signUpCredential.name ||
      !signUpCredential.password ||
      !signUpCredential.confirmPassword
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (signUpCredential.password !== signUpCredential.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(
        signUpCredential.name,
        signUpCredential.email,
        signUpCredential.password
      );
    } catch (error) {
      console.log(error);
      setError("Registration failed. Please try again.");
    }
  };

  const handleSignUpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpCredential({
      ...signUpCredential,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      // router.push(`/profile/${user?.id}`);
      router.push(`/profile`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={signUpCredential.name}
            onChange={handleSignUpData}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={signUpCredential.email}
            onChange={handleSignUpData}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={signUpCredential.password}
            onChange={handleSignUpData}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="confirmPassword"
            value={signUpCredential.confirmPassword}
            onChange={handleSignUpData}
            required
            placeholder="Confirm your password"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
