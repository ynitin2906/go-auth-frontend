// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import noteReducer from "../slices/notesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
