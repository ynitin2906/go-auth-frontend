"use client";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import TaskDetails from "../components/TaskDetails";

const ProfilePage: React.FC = () => {
  return (
    <div>
      <ProtectedRoute>
        <div>
          <TaskDetails />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
