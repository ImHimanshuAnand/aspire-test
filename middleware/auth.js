import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    // decode and verify
    if (!token) {
        return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    return decodedToken;
}

export const verifyAccessToken = (token) => {
    // decode and verify
    if (!token) {
        return null;
    }

    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
}

export const verifyRefreshToken = (token) => {
    // decode and verify
    if (!token) {
        return null;
    }

    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
}