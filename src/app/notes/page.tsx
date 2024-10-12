"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import NotesDetails from "../components/NotesDetails";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
        <div>
          <NotesDetails />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
