import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponseData } from "../types/user";

interface UserState {
  user: UserResponseData; // For individual user data
  allUsers: UserResponseData[]; // For storing all users
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    notes: [],
    tasks: [],
    profile_picture: "",
    social_media: {
      twitter: "",
      linkedin: "",
      github: "",
      facebook: "",
      instagram: "",
      snapchat: "",
      youtube: "",
      pinterest: "",
      discord: "",
      website: "",
    },
  },
  allUsers: [], // Initialize as an empty array
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInStore(state, action: PayloadAction<UserResponseData>) {
      state.user = action.payload;
    },
    setAllUsersInStore(state, action: PayloadAction<UserResponseData[]>) {
      state.allUsers = action.payload;
    },
  },
});

export const { setUserInStore, setAllUsersInStore } = userSlice.actions;
export default userSlice.reducer;
