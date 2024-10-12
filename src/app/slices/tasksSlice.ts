import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../types/tasks"; // Import Task type

// Define the initial state for tasks
interface TasksState {
  tasks: Task[]; // Array of Task objects
}

const initialState: TasksState = {
  tasks: [], // Initialize with an empty tasks array
};

const tasksSlice = createSlice({
  name: "tasks", // Slice name for tasks
  initialState,
  reducers: {
    // Reducer for setting tasks in the store
    setTasksInStore(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload; // Update the state with new tasks
    },
  },
});

// Export the action to set tasks in the store
export const { setTasksInStore } = tasksSlice.actions;

// Export the reducer to use in the store
export default tasksSlice.reducer;
