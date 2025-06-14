// controllers/todoController.js
import * as todoService from "../service/todoService.js";

export const create = async (req, res) => {
  try {
    const { name, shortDescription, datetime } = req.body;
    if (!name || !shortDescription || !datetime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const todo = await todoService.createTodo({
      name,
      shortDescription,
      datetime,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const { filter } = req.query;
    const todos = await todoService.getTodos(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { isDone } = req.body;
    const todo = await todoService.updateTodo(req.params.id, { isDone });
    res.json(todo);
  } catch (error) {
    if (error.message === "Todo not found")
      return res.status(404).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error.message === "Todo not found")
      return res.status(404).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
