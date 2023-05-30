import express from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import mongooseConnect from "./database/db.js"

import { UserModel } from "./models/User.js"
import { signToken, generateAccessToken, generateRefreshToken } from "./util.js"
import { verifyToken, verifyAccessToken, verifyRefreshToken } from "./middleware/auth.js"

dotenv.config();
const app = express();
app.use(express.json());


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const getUser = await UserModel.findOne({ username: username });
        if (!getUser) {
            return res.status(404).json("No User found");
        }
        const getUserWithPassword = await UserModel.findOne({ username: username, password: password });
        if (!getUserWithPassword) {
            return res.status(404).json("Password is incorrect.")
        }

        // send back with token
        return res.status(200).json({
            accessToken: generateAccessToken({ userName: getUserWithPassword.username, userEmail: getUserWithPassword.email }),
            refreshToken: generateRefreshToken({ userName: getUserWithPassword.username }),
            message: "Successfully Logged In"
        })

    } catch (error) {
        return res.status(401).json("Something went wrong!")
    }
})

app.get("/profile", async (req, res) => {
    // get profile
    try {
        const { token } = req.query;
        const decodedToken = verifyAccessToken(token);
        if (!decodedToken) {
            return res.status(401).json("Invalid Token.")
        }

        // fetch from db and return reponse.

    } catch (error) {
        return res.status(401).json("Something went wrong!")
    }

})

app.post("/refresh", (req, res) => {
    try {
        const { refreshToken } = req.body;
        const decodedRefreshToken = verifyRefreshToken(refreshToken);

        if (!decodedRefreshToken) {
            return res.status(401).json("Invalid Refresh Token")
        }

        // verify user credentials from database and use for generating the token.
        const newRefreshToken = generateRefreshToken({ userName: userName })

        return res.status(200).json({
            refreshToken: newRefreshToken,
            msg: "Successfully refresh token"
        })

    } catch (error) {
        return res.status(401).json("Something went wrong!")
    }
})

app.listen(PORT, () => console.log(`Server started at port:${PORT}`))

