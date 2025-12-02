import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) =>
{
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
    {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    try
    {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        req.user = result;
        next();
    }
    catch (errors) 
    {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};
