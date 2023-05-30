import jwt from "jsonwebtoken";

export const signToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    });

    return token;
}

export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
    });
}

export const generateRefreshToken = (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
    });
}