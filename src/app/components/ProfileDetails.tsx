/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllAvatars,
  getLogdinUser,
  getUserById,
  updateUserProfile,
} from "../services/userService";
import { setUserInStore } from "../slices/userSlice";
import { UserResponseData } from "../types/user";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaSnapchat,
  FaYoutube,
  FaPinterest,
  FaDiscord,
  FaGlobe,
} from "react-icons/fa";
import PopupModal from "./PopupModal";
import EditProfile from "./EditProfile";
import Loader from "./Loader";
import { countTasksStatus } from "../utils/tasksCount";

interface ProfileDetailsProps {
  userId?: string;
}

const ProfileDetails = ({ userId }: ProfileDetailsProps) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const [renderUser, setRenderUser] = useState<UserResponseData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data } = userId
          ? await getUserById(userId)
          : await getLogdinUser();
        setRenderUser(data);
        if (!userId) dispatch(setUserInStore(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [userId, dispatch]);

  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };
  const toggleEditProfile = () => {
    setIsEditMode((prev) => !prev);
  };
  const toggleAvatarModal = () => {
    setIsAvatarModalOpen((prev) => !prev);
  };
  useEffect(() => {
    setRenderUser(user);
  }, [user]);
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "progress":
        return "text-black-600";
      case "done":
        return "text-black-600";
      default:
        return "text-black-600";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center">
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24">
                {renderUser?.profile_picture ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/avatar/${renderUser.profile_picture}`}
                    alt="User Avatar"
                    className="rounded-full w-24 h-24 object-cover cursor-pointer"
                    onClick={() => !userId && toggleAvatarModal()}
                  />
                ) : (
                  <div
                    className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center text-4xl font-bold text-gray-400 cursor-pointer"
                    onClick={() => !userId && toggleAvatarModal()}
                  >
                    {renderUser?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {renderUser?.name || "John Doe"}
                </h1>
                <p className="text-gray-600">
                  {renderUser?.email || "john@example.com"}
                </p>
              </div>
            </div>

            {!userId && (
              <div className="text-right">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={toggleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <PopupModal
            isOpen={isEditMode}
            onClose={toggleEditProfile}
            modalName="Edit Profile"
          >
            <EditProfile onClose={toggleEditProfile} />
          </PopupModal>
          <PopupModal
            isOpen={isAvatarModalOpen}
            onClose={toggleAvatarModal}
            modalName="Select Avatar"
          >
            <AvatarSelector onClose={toggleAvatarModal} />
          </PopupModal>

          <div className="flex space-x-4 mt-6">
            {renderUser?.social_media?.facebook && (
              <FaFacebook
                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.facebook)}
              />
            )}
            {renderUser?.social_media?.twitter && (
              <FaTwitter
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.twitter)}
              />
            )}
            {renderUser?.social_media?.linkedin && (
              <FaLinkedin
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.linkedin)}
              />
            )}
            {renderUser?.social_media?.instagram && (
              <FaInstagram
                className="text-pink-500 hover:text-pink-600 cursor-pointer"
                onClick={() =>
                  openInNewTab(renderUser?.social_media?.instagram)
                }
              />
            )}
            {renderUser?.social_media?.github && (
              <FaGithub
                className="text-gray-800 hover:text-gray-900 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.github)}
              />
            )}
            {renderUser?.social_media?.snapchat && (
              <FaSnapchat
                className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.snapchat)}
              />
            )}
            {renderUser?.social_media?.youtube && (
              <FaYoutube
                className="text-red-600 hover:text-red-700 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.youtube)}
              />
            )}
            {renderUser?.social_media?.pinterest && (
              <FaPinterest
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() =>
                  openInNewTab(renderUser?.social_media?.pinterest)
                }
              />
            )}
            {renderUser?.social_media?.discord && (
              <FaDiscord
                className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.discord)}
              />
            )}
            {renderUser?.social_media?.website && (
              <FaGlobe
                className="text-green-600 hover:text-green-700 cursor-pointer"
                onClick={() => openInNewTab(renderUser?.social_media?.website)}
              />
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Notes Card */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
              <div className="flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 6h8M8 10h8M8 14h8M8 18h8M4 6h.01M4 10h.01M4 14h.01M4 18h.01M4 4h16v16H4V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">Notes</h3>
              <p className="text-gray-600 mt-2">
                {renderUser?.notes?.length || 0}
              </p>
            </div>

            {/* Tasks Card */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
              <div className="flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m-6-8h6m2 8h2a2 2 0 002-2V6a2 2 0 00-2-2h-2m-2 0H9a2 2 0 00-2 2v8a2 2 0 002 2h2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">Tasks</h3>
              <p className="text-gray-600 mt-2">
                Pending:
                <span className={`font-bold  ${getStatusStyles("pending")}`}>
                  {countTasksStatus(renderUser).pending}
                </span>
              </p>
              <p className="text-gray-600">
                Progress:
                <span className={`font-bold  ${getStatusStyles("progress")}`}>
                  {countTasksStatus(renderUser).progress}
                </span>
              </p>
              <p className="text-gray-600">
                Done:
                <span className={`font-bold  ${getStatusStyles("done")}`}>
                  {countTasksStatus(renderUser).done}
                </span>
              </p>
            </div>

            {/* Groups Card */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
              <div className="flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14c-3.313 0-6-2.686-6-6s2.687-6 6-6 6 2.686 6 6-2.687 6-6 6zm0 0c3.313 0 6 2.686 6 6v1H6v-1c0-3.314 2.687-6 6-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">Groups</h3>
              <p className="text-gray-600 mt-2">0</p>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            {/* bg-gray-50 */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Additional Information
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Full Name:</strong> {renderUser?.name || "John Doe"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> {renderUser?.email || "john@example.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

const AvatarSelector = ({ onClose }: { onClose: () => void }) => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); // Track selected avatar
  const dispatch = useAppDispatch();
  console.log(selectedAvatar);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const { data } = await getAllAvatars();
        setAvatars(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to load avatars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvatars();
  }, []);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAvatar) return;

    const updatedUser = { profile_picture: selectedAvatar };
    try {
      const { data } = await updateUserProfile(updatedUser);
      dispatch(setUserInStore(data));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading avatars...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 rounded-lg ${
              selectedAvatar === avatar ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/avatar/${avatar}`}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full border-4 border-white object-cover w-16 h-16"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={!selectedAvatar}
      >
        Upload Avatar
      </button>
    </form>
  );
};
