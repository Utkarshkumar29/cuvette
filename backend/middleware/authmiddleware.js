const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const User = require('../models/userModel'); // Ensure the User model is imported

const app = express();
app.use(cookieParser());

const protect = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    console.log(token,'token');

    if (!token) {
        return res.status(401).send("Not authorized, please log in");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).send("User not found");
        }
        next();
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(401).send("Not authorized, token failed");
    }
};

module.exports = { protect };
