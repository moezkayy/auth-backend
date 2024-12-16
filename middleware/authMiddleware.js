// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function to authenticate the token
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid token' });
        }

        // If token is valid, attach user data to the request object
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
