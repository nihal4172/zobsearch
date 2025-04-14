import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please login to access this resource",
                success: false,
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.id = decoded.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token. Please login again",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default isAuthenticated;