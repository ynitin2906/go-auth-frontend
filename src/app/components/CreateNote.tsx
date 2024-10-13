"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createNote } from "../services/notesService"; // Adjust the import according to your service structure
import { setNotesInStore } from "../slices/notesSlice";

const CreateNote = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const { notes } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();
  console.log(notes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newNote = { title, category, note };
      const { data } = await createNote(newNote);
      dispatch(setNotesInStore([...(notes || []), data]));
      setTitle("");
      setCategory("");
      setNote("");
      onClose();
    } catch (error) {
      console.error("Failed to create note:", error);
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
        Create Note
      </button>
    </form>
  );
};

export default CreateNote;
