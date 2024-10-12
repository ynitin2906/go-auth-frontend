"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createTask } from "../services/tasksService";
import { setTasksInStore } from "../slices/tasksSlice";

const Createtask = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("pending");
  const { tasks } = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = { title, category, task, status };
      const { data } = await createTask(newTask); // Call the API to create a note
      dispatch(setTasksInStore([...tasks, data])); // Dispatch the action to update the store
      // Reset form fields
      setTitle("");
      setCategory("");
      setTask("");
      setStatus("pending");
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Failed to create task:", error);
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
          htmlFor="task"
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
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
};

export default Createtask;
