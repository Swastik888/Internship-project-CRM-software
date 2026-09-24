import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;
    const header = req.headers.authorization;

    if (header && header.startsWith("Bearer ")) {
        token = header.split(" ")[1];
    }

    if (!token) {
        throw new Apierror(401, "Not authorized, no token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        throw new Apierror(401, "Not authorized, token invalid or expired");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Apierror(401, "Not authorized, user no longer exists");
    }

    req.user = user;
    next();
});