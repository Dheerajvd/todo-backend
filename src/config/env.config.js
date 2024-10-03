require("dotenv").config();

const configurationVariables = {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    BCRYPT_KEY: process.env.BCRYPT_KEY
}

module.exports = configurationVariables;