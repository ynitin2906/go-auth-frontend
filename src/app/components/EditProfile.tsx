"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserInStore } from "../slices/userSlice";
import { updateUserProfile } from "../services/userService";

interface EditProfileProps {
  onClose: () => void;
}

const EditProfile = ({ onClose }: EditProfileProps) => {
  const { user } = useAppSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [socialMedia, setSocialMedia] = useState(user.social_media || {});
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { name, email, social_media: socialMedia };

    try {
      const { data } = await updateUserProfile(updatedUser);
      console.log("api update", data);
      dispatch(setUserInStore(data));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Social Media Links */}
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Social Media Links
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Facebook"
              value={socialMedia.facebook || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Twitter"
              value={socialMedia.twitter || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, twitter: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="LinkedIn"
              value={socialMedia.linkedin || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedin: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Github"
              value={socialMedia.github || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, github: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Instagram"
              value={socialMedia.instagram || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, instagram: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Snapchat"
              value={socialMedia.snapchat || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, snapchat: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Youtube"
              value={socialMedia.youtube || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, youtube: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Pinterest"
              value={socialMedia.pinterest || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, pinterest: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Discord"
              value={socialMedia.discord || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, discord: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Website"
              value={socialMedia.website || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, website: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Profile
      </button>
    </form>
  );
};

export default EditProfile;
