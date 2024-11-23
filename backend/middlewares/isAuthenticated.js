import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req?.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required."
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.id = decoded.userId;
            next();
        } catch (error) {
            console.error("Token Verification Error:", error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token."
            });
        }
    } catch (error) {
        console.error("Middleware Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Authentication error."
        });
    }
};
