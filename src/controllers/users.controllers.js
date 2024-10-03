const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configurationVariables = require("../config/env.config");

// @desc: User Login
// @endpoint: api/users/login
// @method: POST
// @access: Public
// @request: {email: "dalabanjandheeraj@gmail.com", password: "Test@123"}
const handleUserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

    let user = await User.findOne({ email });
    if (user && !user.isBlocked) {
        const userData = {
            username: user.username,
            email: user.email,
            _id: user._id,
            role: user.role
        };
        if (await bcrypt.compare(password, user.password)) {
            let auth_token = jwt.sign(
                {
                    user: userData
                },
                configurationVariables.JWT_SECRET_KEY,
                {
                    expiresIn: "30m"
                }
            );
            res.status(200).json({
                statusCode: 200,
                authToken: auth_token,
                user: userData
            });
        } else {
            res.status(200).json({
                statusCode: 100,
                statusMessage: "Username and Password does not match!"
            });
        }
    } else {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Username doesn't exist! kindly Sign-Up"
        });
    }
});

// @desc: User SignUp
// @endpoint: api/users/sign-up
// @method: POST
// @access: Public
// @request: {username: "dheeraj", email: "dalabanjandheeraj@gmail.com", password: "Test@123", role: 1}
const handleUserSignIn = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        res.status(400).json({
            statusCode: 400,
            statusMessage: "Bad Request"
        });
    }

    let isUserExisting = await User.findOne({ email });

    if (isUserExisting) {
        res.status(200).json({
            statusCode: 100,
            statusMessage: "Already a user! Kindly login" ,
            data: { _id: isUserExisting._id }
        });
    } else {
        let hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPass,
            role,
            isBlocked: false
        });

        if (user) {
            const userData = {
                username: user.username,
                email: user.email,
                _id: user._id,
                role: user.role
            };

            let auth_token = jwt.sign(
                {
                    user: userData
                },
                configurationVariables.JWT_SECRET_KEY,
                {
                    expiresIn: "30m"
                }
            );

            res.status(200).json({
                statusCode: 200,
                authToken: auth_token,
                user: userData
            });
        } else {
            res.status(500).json({
                statusCode: 500,
                statusMessage: "Failed to create user"
            });
        }
    }
});


module.exports = {
    handleUserLogin,
    handleUserSignIn
};
