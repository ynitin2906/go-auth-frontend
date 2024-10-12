export interface CreateTask {
  title: string;
  category: string;
  task: string;
  status: string;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  task: string;
  user_id: string;
  status_history?: Status[];
}
export interface Status {
  user_id: string;
  status: string;
}
