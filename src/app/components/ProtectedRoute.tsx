"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
