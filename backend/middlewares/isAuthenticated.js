import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication token is required."});
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid or expired token.", error: error.message });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(500).json({  message: "User Authencate error", error: error.message });
    }
};
