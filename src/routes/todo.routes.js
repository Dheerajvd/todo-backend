const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/token-handler");
const { handleGetTodo, handleCreateTodo, handleUpdateTodoItem, handleDeleteTodoItem, getTodoItem } = require("../controllers/todo.controllers");

//methods
router.get("/todo", validateToken, handleGetTodo); // --> get all todos
router.post("/todo", validateToken, handleCreateTodo); // --> add todo
router.put("/todo/:id", validateToken, handleUpdateTodoItem); // --> update todo item
router.delete("/todo/:id", validateToken, handleDeleteTodoItem); // --> delete todo item
router.get("/todo/:id", validateToken, getTodoItem); // --> get todo item

module.exports = router;
