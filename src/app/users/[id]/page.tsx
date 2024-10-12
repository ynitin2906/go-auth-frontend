"use client";
import { useParams } from "next/navigation";
import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import ProfileDetails from "../../components/ProfileDetails";

const ProfilePage: React.FC = () => {
  const params = useParams(); // Use 'params' to get route params
  const userId = params?.id as string | undefined; // Type inference, fallback to undefined

  return (
    <div>
      <ProtectedRoute>
        <div>
          <ProfileDetails userId={userId} />
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
