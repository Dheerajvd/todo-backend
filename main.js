const express = require("express");
const app = express();
const errorHandler = require("./src/middlewares/error-handler");
const { connectDb } = require("./src/config/db.config");
const cors = require("cors");
const configurationVariables = require('./src/config/env.config');
const validateToken = require("./src/middlewares/token-handler");

app.use(cors());

// db connection
connectDb();

// data parser
app.use(express.json());

// handlers
app.use(errorHandler);

// Routes
app.use("/api/users", require("./src/routes/users.routes"));
app.use("/api", require("./src/routes/todo.routes"));

const PORT = configurationVariables.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
});
