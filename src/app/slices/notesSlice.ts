import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../types/notes";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesInStore(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
  },
});

export const { setNotesInStore } = notesSlice.actions;
export default notesSlice.reducer;
