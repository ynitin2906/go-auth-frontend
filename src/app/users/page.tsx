"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardDetails from "../components/DashboardDetails";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
        <div>
          <DashboardDetails />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
