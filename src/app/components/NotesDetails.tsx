// NotesDetails.tsx

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getNotesByUserId,
  getUserNotes,
  deleteNote,
} from "../services/notesService"; // Import the deleteNote function
import { setNotesInStore } from "../slices/notesSlice";
import CreateNote from "./CreateNote"; // Import the CreateNote component
import PopupModal from "./PopupModal";
import EditNote from "./EditNote"; // Import the EditNote component
import { MdDelete, MdEdit } from "react-icons/md"; // Import the edit icon

interface NoteDetailsProps {
  userId?: string;
}

const NotesDetails = ({ userId }: NoteDetailsProps) => {
  const { notes } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false); // State to manage the visibility of the CreateNote form
  const [isEditing, setIsEditing] = useState(false); // State to manage the visibility of the EditNote form
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null); // Track the note being edited

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = userId
          ? await getNotesByUserId(userId)
          : await getUserNotes();
        dispatch(setNotesInStore(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleCreateNote = () => {
    setIsCreating((prev) => !prev); // Toggle the form visibility
  };

  const toggleEditNote = (noteId?: string) => {
    setCurrentNoteId(noteId || null); // Set the current note ID or null if closing
    setIsEditing((prev) => !prev); // Toggle the edit form visibility
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId); // Call the API to delete the note
      dispatch(setNotesInStore(notes.filter((note) => note.id !== noteId))); // Update the store after deletion
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div
        onClick={toggleCreateNote}
        className="flex items-center cursor-pointer bg-green-500 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4"
      >
        <span className="font-semibold">
          {isCreating ? "Cancel" : "Create Note"}
        </span>
      </div>

      <PopupModal
        isOpen={isCreating}
        onClose={toggleCreateNote}
        modalName="Create a New Note"
      >
        <CreateNote onClose={toggleCreateNote} />
      </PopupModal>

      <PopupModal
        isOpen={isEditing}
        onClose={() => toggleEditNote()}
        modalName="Edit Note"
      >
        {currentNoteId && (
          <EditNote noteId={currentNoteId} onClose={() => toggleEditNote()} />
        )}
      </PopupModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="relative bg-yellow-200 p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 group"
            >
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-600 italic">{note.category}</p>
              <p className="text-gray-700">{note.note}</p>
              <MdEdit
                onClick={() => toggleEditNote(note.id)}
                className="absolute top-2 right-9 text-blue-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                size={24}
              />
              <MdDelete
                onClick={() => handleDeleteNote(note.id)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                size={24}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesDetails;
