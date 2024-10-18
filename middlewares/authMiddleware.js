const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
const authMiddleware = (req, res, next) => {
    // Get token from the 'Authorization' header
    const token = req.header('Authorization')?.split(' ')[1]; // 'Bearer <token>'

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user to the request object
        req.user = decoded.userId; // Assuming you store userId in the token

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;