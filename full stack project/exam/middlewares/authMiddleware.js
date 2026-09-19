import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        // Check token
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Admin token is required"
            });
        }

        // Check Bearer
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "Invalid authorization format"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Check role
        if (decoded.role !== "admin") {
            return res.status(403).json({
                status: false,
                message: "Only admin can access this API"
            });
        }

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            status: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;