"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfileDetails from "../components/ProfileDetails";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
        <div>
          <ProfileDetails />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
