const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configurationVariables = require("../config/env.config");
const todos = require('../models/todo.model')
// @desc: Get List of todo
// @endpoint: api/todo
// @method: POST
// @access: Private --> Bearer
const handleGetTodo = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    let todoList = await todos.find({ user_id: _id });
    if (_id) {
        if (todoList && todoList.length > 0) {
            res.status(200).json({
                statusCode: 200,
                todoList
            });
        } else {
            res.status(200).json({
                statusCode: 100,
                statusMessage: "Could not find any items listed for todos",
                todoList: []
            });
        }
    } else {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Could not find user id"
        });
    }
});

// @desc: User SignUp
// @endpoint: api/todo
// @method: POST
// @access: Public
// @request: {title: "Title for todo", content: "content for todo", isCompleted: false}
const handleCreateTodo = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { title, content, isCompleted } = req.body;
    if (!title || !content || isCompleted === undefined || !_id) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

    const todo = await todos.create({
        title,
        content,
        user_id: _id,
        isCompleted
    });

    if (todo) {
        const todoData = {
            title: todo.title,
            content: todo.content,
            _id: todo._id,
            isCompleted: todo.isCompleted,
            user_id: todo.user_id
        };

        res.status(200).json({
            statusCode: 200,
            todo: todoData
        });
    } else {
        res.status(500).json({
            statusCode: 500,
            statusMessage: "Failed to create todo item"
        });
    }
});

// @desc: get todo item
// @endpoint: api/todo/"id"
// @method: GET
// @access: private
const getTodoItem = asyncHandler(async (req, res) => {
    let id = req.params.id;
    if (id) {
        const todoItem = await todos.findById(id);
        if (todoItem) {
            res.status(200).json({
                statusCode: 200,
                todoItem,
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                statusMessage: "No Item Found",
            });
        }
    } else {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

});

// @desc: Update todo item
// @endpoint: api/todo/"id"
// @method: PUT
// @access: private
const handleUpdateTodoItem = asyncHandler(async (req, res) => {
    let id = req.params.id;
    if (id) {
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                statusCode: 400,
                statusMessage: "Bad Request"
            });
        } else {
            const todoItem = await todos.findById(id);
            if (todoItem) {
                const updatedTodoItem = await todos.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                res.status(200).json({
                    statusCode: 200,
                    updatedTodoItem,
                });
            } else {
                res.status(200).json({
                    statusCode: 200,
                    statusMessage: "No Item Found",
                });
            }
        }
    } else {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }
});

// @desc: delete todo item
// @endpoint: api/todo/"id"
// @method: DELETE
// @access: private
const handleDeleteTodoItem = asyncHandler(async (req, res) => {
    let id = req.params.id;
    if (id) {
        const todoItem = await todos.findById(id);
        if (todoItem) {
            await todos.findByIdAndDelete(id);
            res.status(200).json({
                statusCode: 200,
                todoItem,
            });
        } else {
            res.status(200).json({
                statusCode: 200,
                statusMessage: "No Item Found",
            });
        }
    } else {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }
});



module.exports = {
    handleGetTodo,
    handleCreateTodo,
    handleUpdateTodoItem,
    handleDeleteTodoItem,
    getTodoItem
};
