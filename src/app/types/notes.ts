export interface CreateNote {
  title: string;
  category: string;
  note: string;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  note: string;
  user_id: string;
}
