import type { Todo, TodoFormInput } from "@/types/todo";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/todos",
});

export const fetchTodos = async (filter: string): Promise<Todo[]> => {
  const { data } = await api.get("/", {
    params: filter !== "all" ? { filter } : {},
  });
  return data;
};

export const createTodo = async (todo: TodoFormInput): Promise<Todo> => {
  const response = await api.post("/create", todo);
  return response.data;
};

export const updateTodo = async (
  id: string,
  todo: Partial<Todo>
): Promise<Todo> => {
  console.log(todo);
  const { data } = await api.put(`/${id}`, todo);
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
