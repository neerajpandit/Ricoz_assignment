import jwt from 'jsonwebtoken';
import {User} from "../models/user.model.js";
import ErrorResponse from '../utils/errorResponse.js';

// Check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('You must log in to access this resource', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('You must log in to access this resource', 401));
    }
};

// Admin middleware
export const isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};
