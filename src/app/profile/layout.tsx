"use client";

import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProtectedRoute>
        <Header />
        <main>{children}</main>
      </ProtectedRoute>
    </div>
  );
}
