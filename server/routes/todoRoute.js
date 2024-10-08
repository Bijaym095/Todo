import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const todoRoute = express.Router();

todoRoute.route("/").get(getTodos).post(createTodo);
todoRoute.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);

export default todoRoute;
