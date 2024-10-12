// EditNote.tsx

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setNotesInStore } from "../slices/notesSlice";
import { updateNote } from "../services/notesService";

interface EditNoteProps {
  noteId: string;
  onClose: () => void;
}

const EditNote = ({ noteId, onClose }: EditNoteProps) => {
  const { notes } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  // Find the note to edit
  const noteToEdit = notes.find((note) => note.id === noteId);
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [category, setCategory] = useState(noteToEdit?.category || "");
  const [note, setNote] = useState(noteToEdit?.note || "");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setCategory(noteToEdit.category);
      setNote(noteToEdit.note);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedNote = { title, category, note };
      const { data } = await updateNote(noteId, updatedNote); // Call the API to update the note
      console.log(data);

      dispatch(setNotesInStore(notes.map((n) => (n.id === noteId ? data : n)))); // Update the store
      onClose(); // Close the edit form after submission
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Note
        </label>
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded w-full"
          required
          style={{ overflow: "hidden", height: "auto" }}
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Note
      </button>
    </form>
  );
};

export default EditNote;
