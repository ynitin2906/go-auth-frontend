import { Task } from "../types/tasks";
import { UserResponseData } from "../types/user";

export const countTasksStatus = (
  renderUser: UserResponseData | undefined
): {
  pending: number;
  progress: number;
  done: number;
} => {
  const statusCounts = {
    pending: 0,
    progress: 0,
    done: 0,
  };

  if (!renderUser || !renderUser.tasks) {
    return statusCounts;
  }
  renderUser.tasks.forEach((task: Task) => {
    if (task.status_history && task.status_history.length > 0) {
      const lastStatus = task.status_history[task.status_history.length - 1];

      if (lastStatus.status === "pending") {
        statusCounts.pending += 1;
      } else if (lastStatus.status === "progress") {
        statusCounts.progress += 1;
      } else if (lastStatus.status === "done") {
        statusCounts.done += 1;
      }
    }
  });
  return statusCounts;
};
