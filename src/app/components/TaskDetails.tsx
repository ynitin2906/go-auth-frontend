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
import { MdDelete, MdEdit, MdAdd } from "react-icons/md"; // MdAdd for plus icon
import Createtask from "./CreateTask";
import EditTask from "./EditTask";
import { Task } from "../types/tasks";
import Loader from "./Loader";

interface TaskDetailsProps {
  userId?: string;
}

const TaskDetails = ({ userId }: TaskDetailsProps) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = userId
          ? await getTasksByUserId(userId)
          : await getUserTasks();
        dispatch(setTasksInStore(data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const toggleCreateTask = () => {
    setIsCreating((prev) => !prev);
  };

  const toggleEditTask = (taskId?: string) => {
    setCurrentTaskId(taskId || null);
    setIsEditing((prev) => !prev);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      dispatch(setTasksInStore(tasks.filter((task) => task.id !== taskId)));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const returnCurrentStatus = (task: Task): string => {
    if (task?.status_history && task.status_history.length > 0) {
      return task.status_history[task.status_history.length - 1].status;
    }
    return "pending";
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "progress":
        return "bg-blue-200 text-blue-700";
      case "done":
        return "bg-green-200 text-green-700";
      default:
        return "bg-red-200 text-red-700";
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
    <div className="flex flex-col px-2 py-4">
      <div
        onClick={toggleCreateTask}
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 text-white  rounded-full shadow-lg cursor-pointer hover:bg-green-600 hover:shadow-2xl transition-all flex items-center justify-center"
      >
        <MdAdd size={28} />
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
        modalName="Edit Task"
      >
        {currentTaskId && (
          <EditTask taskId={currentTaskId} onClose={() => toggleEditTask()} />
        )}
      </PopupModal>

      <div className="flex flex-wrap justify-start gap-4 w-full mt-4">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{ width: "18%" }}
              className="relative bg-white p-2 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl group" // Set width for compactness
            >
              <h2 className="font-semibold text-sm text-gray-900 truncate">
                {task.title}
              </h2>
              <p className="text-gray-500 italic text-xs mb-1 truncate">
                {task.category}
              </p>

              <p className="ql-snow mb-8 text-xs">
                <span
                  className="ql-editor truncate"
                  dangerouslySetInnerHTML={{ __html: task.task }}
                ></span>
              </p>

              <div
                className={`absolute bottom-2 right-2 inline-block px-1 py-1 text-xs font-semibold rounded ${getStatusStyles(
                  returnCurrentStatus(task)
                )}`}
              >
                {returnCurrentStatus(task).toUpperCase()}
              </div>

              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MdEdit
                  onClick={() => toggleEditTask(task.id)}
                  className="text-blue-500 cursor-pointer"
                  size={20}
                />
                <MdDelete
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 cursor-pointer"
                  size={20}
                />
              </div>
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
