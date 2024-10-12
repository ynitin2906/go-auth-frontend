"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteTask,
  getTasksByUserId,
  getUserTasks,
} from "../services/tasksService";
import { setTasksInStore } from "../slices/tasksSlice";
import PopupModal from "./PopupModal";
import { MdDelete, MdEdit } from "react-icons/md";
import Createtask from "./CreateTask";
import EditTask from "./EditTask";

interface NoteDetailsProps {
  userId?: string;
}

const TaskDetails = ({ userId }: NoteDetailsProps) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false); // State to manage the visibility of the CreateNote form
  const [isEditing, setIsEditing] = useState(false); // State to manage the visibility of the EditNote form
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null); // Track the note being edited

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = userId
          ? await getTasksByUserId(userId)
          : await getUserTasks();
        dispatch(setTasksInStore(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleCreateTask = () => {
    setIsCreating((prev) => !prev); // Toggle the form visibility
  };

  const toggleEditTask = (taskId?: string) => {
    setCurrentTaskId(taskId || null); // Set the current note ID or null if closing
    setIsEditing((prev) => !prev); // Toggle the edit form visibility
  };

  const handleDeleteNote = async (taskId: string) => {
    try {
      await deleteTask(taskId); // Call the API to delete the note
      dispatch(setTasksInStore(tasks.filter((task) => task.id !== taskId))); // Update the store after deletion
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div
        onClick={toggleCreateTask}
        className="flex items-center cursor-pointer bg-green-500 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4"
      >
        <span className="font-semibold">
          {isCreating ? "Cancel" : "Create Task"}
        </span>
      </div>

      <PopupModal
        isOpen={isCreating}
        onClose={toggleCreateTask}
        modalName="Create a New Task"
      >
        <Createtask onClose={toggleCreateTask} />
      </PopupModal>

      <PopupModal
        isOpen={isEditing}
        onClose={() => toggleEditTask()}
        modalName="Edit Note"
      >
        {currentTaskId && (
          <EditTask taskId={currentTaskId} onClose={() => toggleEditTask()} />
        )}
      </PopupModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="relative bg-yellow-200 p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 group"
            >
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p className="text-gray-600 italic">{task.category}</p>
              <p className="text-gray-700">{task.task}</p>
              <MdEdit
                onClick={() => toggleEditTask(task.id)}
                className="absolute top-2 right-9 text-blue-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                size={24}
              />
              <MdDelete
                onClick={() => handleDeleteNote(task.id)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
                size={24}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
