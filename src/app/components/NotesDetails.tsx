// NotesDetails.tsx

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getNotesByUserId,
  getUserNotes,
  deleteNote,
} from "../services/notesService";
import { setNotesInStore } from "../slices/notesSlice";
import CreateNote from "./CreateNote";
import PopupModal from "./PopupModal";
import EditNote from "./EditNote";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import Loader from "./Loader";

interface NoteDetailsProps {
  userId?: string;
}

const NotesDetails = ({ userId }: NoteDetailsProps) => {
  const { notes } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const { data } = userId
          ? await getNotesByUserId(userId)
          : await getUserNotes();
        dispatch(setNotesInStore(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleCreateNote = () => {
    setIsCreating((prev) => !prev);
  };

  const toggleEditNote = (noteId?: string) => {
    setCurrentNoteId(noteId || null);
    setIsEditing((prev) => !prev);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      dispatch(setNotesInStore(notes.filter((note) => note.id !== noteId)));
    } catch (error) {
      console.error("Failed to delete note:", error);
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
    <div className="flex flex-col items-center py-8">
      <div
        onClick={toggleCreateNote}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-green-600 hover:shadow-2xl transition-all flex items-center justify-center"
      >
        <MdAdd size={32} />
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

              <div className="bg-yellow-200 absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MdEdit
                  onClick={() => toggleEditNote(note.id)}
                  className="text-blue-500 cursor-pointer"
                  size={20}
                />
                <MdDelete
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 cursor-pointer"
                  size={20}
                />
              </div>
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
