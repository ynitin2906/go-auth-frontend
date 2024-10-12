"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllUsers } from "../services/userService";
import { setAllUsersInStore } from "../slices/userSlice";
import Link from "next/link"; // Import Link for navigation
import Loader from "./Loader";

const DashboardDetails = () => {
  const dispatch = useAppDispatch();
  const { user, allUsers } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllUsers();
        dispatch(setAllUsersInStore(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredUsers = allUsers.filter((u) => u.id !== user.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {filteredUsers?.length > 0 ? (
        <div className="w-full max-w-6xl">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Notes Count</th>
                <th className="py-2 px-4 border-b">Tasks Count</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    {user.notes?.length || 0}
                  </td>
                  <td className="py-2 px-4 border-b">{0}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No users available.</p>
      )}
    </div>
  );
};

export default DashboardDetails;
