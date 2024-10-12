// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import noteReducer from "../slices/notesSlice";
import taskReducer from "../slices/tasksSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: noteReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
