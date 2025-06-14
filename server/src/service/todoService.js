// services/todoService.js
import Todo from "../models/Todo.js";

export const createTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

export const getTodos = async (filter) => {
  let query = {};
  if (filter === "done") query.isDone = true;
  if (filter === "upcoming") query.isDone = false;
  return await Todo.find(query).sort({ datetime: 1 });
};

export const updateTodo = async (id, data) => {
  const todo = await Todo.findByIdAndUpdate(id, data, { new: true });
  if (!todo) throw new Error("Todo not found");
  return todo;
};

export const deleteTodo = async (id) => {
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) throw new Error("Todo not found");
};
