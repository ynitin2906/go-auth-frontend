// EditNote.tsx

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateTask } from "../services/tasksService";
import { setTasksInStore } from "../slices/tasksSlice";
import RichText from "./RichText";
// import RichText from "./RichText";

interface EditTaskProps {
  taskId: string;
  onClose: () => void;
}

const EditTask = ({ taskId, onClose }: EditTaskProps) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  // Find the note to edit
  const taskToEdit = tasks.find((task) => task.id === taskId);

  const lastStatus =
    taskToEdit?.status_history && taskToEdit.status_history.length > 0
      ? taskToEdit.status_history[taskToEdit.status_history.length - 1].status
      : "pending"; // Default value if status_history is empty or undefined

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [category, setCategory] = useState(taskToEdit?.category || "");
  const [task, setTask] = useState(taskToEdit?.task || "");
  const [status, setStatus] = useState(lastStatus); // Set status from status_history or default

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setCategory(taskToEdit.category);
      setTask(taskToEdit.task);
      setStatus(lastStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedNote = { title, category, task, status };
      const { data } = await updateTask(taskId, updatedNote); // Call the API to update the note
      console.log(data);

      dispatch(setTasksInStore(tasks.map((t) => (t.id === taskId ? data : t)))); // Update the store
      onClose(); // Close the edit form after submission
    } catch (error) {
      console.error("Failed to update task:", error);
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
        {/* <label
          htmlFor="note"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Task
        </label>
        <textarea
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded w-full"
          required
          style={{ overflow: "hidden", height: "auto" }}
          rows={3}
        /> */}
        <RichText
          label="Task"
          value={task}
          onChangeFun={(value) => setTask(value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="pending">Pending</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTask;
