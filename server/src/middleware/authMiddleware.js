import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


// Initialize prisma client 
const prisma = new PrismaClient();

const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // checks if token exists
        if (!token) {
            return res.json({ error: "Unauthorized: token is missing" });
        }

        //verify the token
        jwt.verify(token, process.env.JWT_SECRETE, async (err, decoded) => {
            if (err) {
                return res.json({ error: "Unauthorized: Invalid token" });
            }

            // Fetch the user data based on the token decoded
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            //Attach the user object to the request for futher processing
            req.user = user;
            next();
        });

    } catch (error) {
        console.error("Error while validating requireSignin", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }finally{
        await prisma.$disconnect();
    }
}


const isAdmin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.user.email },
        });

        if (user.role !== 2) {
            return res.json("Unauthorized");
        }

        next();
    } catch (error) {
        console.error("Error checking is admin", error);
        return res.status(500).json({ error: "Internal server Error" });
    }finally{
        await prisma.$disconnect();
    }
}

export default {requireSignin, isAdmin}