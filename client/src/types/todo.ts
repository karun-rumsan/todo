export interface Todo {
  _id: string;
  name: string;
  shortDescription: string;
  datetime: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFormInput {
  name: string;
  shortDescription: string;
  datetime: string;
}
