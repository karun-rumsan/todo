import express from "express";
import {
  create,
  getAll,
  remove,
  update,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/create", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
