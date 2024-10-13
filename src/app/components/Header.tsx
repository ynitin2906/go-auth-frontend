"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // Icon for the profile
import { useAppSelector } from "../store/hooks";

const Header = () => {
  const pathname = usePathname();
  const { logout, userFromToken } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const { user } = useAppSelector((state) => state.user);

  const isActiveLink = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 h-16 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 h-full">
        <Link href="/" className="text-2xl font-semibold text-gray-800">
          TasksPhile
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href={`/profile`}
            className={`text-md font-medium transition ${
              isActiveLink(`/profile`)
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/notes"
            className={`text-md font-medium transition ${
              isActiveLink("/notes")
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Notes
          </Link>
          <Link
            href="/tasks"
            className={`text-md font-medium transition ${
              isActiveLink("/tasks")
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            Tasks
          </Link>
          {userFromToken?.role === "admin" && (
            <Link
              href="/users"
              className={`text-md font-medium transition ${
                isActiveLink("/users")
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="relative md:flex items-center space-x-6">
          {/* Profile Icon */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <FaUserCircle className="text-3xl text-gray-700 cursor-pointer" />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                <p className="px-4 py-2 text-sm text-gray-700">
                  <strong>{user?.name}</strong>
                </p>
                <p className="px-4 py-2 text-sm text-gray-500">{user?.email}</p>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
