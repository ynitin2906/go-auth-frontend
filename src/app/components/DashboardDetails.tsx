/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllUsers } from "../services/userService";
import { setAllUsersInStore } from "../slices/userSlice";
import Link from "next/link"; // Import Link for navigation
import Loader from "./Loader";
import { countTasksStatus } from "../utils/tasksCount";

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
  console.log(filteredUsers);

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      {filteredUsers?.length > 0 ? (
        <div className="w-full max-w-6xl">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Email
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Notes
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Tasks
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-4 border-b text-left">
                    <div className="flex items-center gap-3">
                      {user?.profile_picture ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/avatar/${user.profile_picture}`}
                          alt="User Avatar"
                          className="rounded-full w-10 h-10 object-cover border-2 border-gray-300 shadow-sm"
                        />
                      ) : (
                        <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-2xl font-bold text-gray-500">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                      <span className="text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b text-left text-gray-700">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 border-b text-left text-gray-700">
                    {user.notes?.length || 0}
                  </td>
                  <td className="py-4 px-4 border-b text-left text-gray-700">
                    <p className="text-gray-600 mt-1">
                      Pending:{" "}
                      <span className="font-bold ">
                        {countTasksStatus(user).pending}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Progress:{" "}
                      <span className="font-bold ">
                        {countTasksStatus(user).progress}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Done:{" "}
                      <span className="font-bold">
                        {countTasksStatus(user).done}
                      </span>
                    </p>
                  </td>
                  <td className="py-4 px-4 border-b text-left">
                    <Link
                      href={`/users/${user.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
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
        <p className="text-gray-500 text-lg">No users available.</p>
      )}
    </div>
  );
};

export default DashboardDetails;
