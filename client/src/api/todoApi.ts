import type { Todo, TodoFormInput } from "@/types/todo";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

export const fetchTodos = async (filter: string): Promise<Todo[]> => {
  const { data } = await api.get("/todos", {
    params: filter !== "all" ? { filter } : {},
  });
  return data;
};

export const createTodo = async (todo: TodoFormInput): Promise<Todo> => {
  const response = await api.post("/todos/create", todo);
  return response.data;
};

export const updateTodo = async (
  id: string,
  todo: Partial<Todo>
): Promise<Todo> => {
  console.log(todo);
  const { data } = await api.put(`/todos/${id}`, todo);
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
