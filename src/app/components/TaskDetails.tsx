"use client";

interface NoteDetailsProps {
  userId?: string;
}

const TaskDetails = ({ userId }: NoteDetailsProps) => {
  return (
    <div>
      <p className="text-gray-500">No tasks available.</p>
    </div>
  );
};

export default TaskDetails;
