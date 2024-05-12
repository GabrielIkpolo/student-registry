import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import authHelper from "../helpers/authHelper.js";
import { validate } from "email-validator";


// Initialize Prisma 
const prisma = new PrismaClient();

// register a user
const register = async (req, res) => {

    const { email, fullName, password, role } = req.body;
    try {
        await prisma.$transaction(async (prisma) => {
            // Some input validations
            if (!email) {
                return res.json({ Error: "Email is required" });
            }

            if (!email || !validate(email)) {
                return res.json({ Error: "Real email is required" });
            }

            if (!fullName) {
                return res.json({ error: "Fullname is required" });
            }

            if (!password || password.trim().length < 6) {
                return res.json({ error: "Password must be at least 6 characters long" });
            }

            //Check if email already exist 
            const existingEmail = await prisma.user.findUnique({
                where: { email: email },
            });

            if (existingEmail) {
                return res.json({ error: "Email already exists" });
            }

            // Hash the password before saving it to db 
            const hashedPassword = await authHelper.hashPassword(password);

            //Create the user
            const newUser = await prisma.user.create({
                data: {
                    email,
                    fullName,
                    password: hashedPassword,
                    role
                },
            });

            //Generate JWT token
            const token = jwt.sign({ userId: newUser.id },
                process.env.JWT_SECRETE, { expiresIn: '2h' });

            // Delete sensitive information befor returning it
            delete newUser.password;

            // Return the token and user information
            return res.status(200).json({ token, user: newUser });

        }, { timeout: 30000 });
    } catch (error) {
        console.error("Error registering user", error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }

}


const login = async (req, res) => {

    const { email, password } = req.body;

    //Validate inputes
    if (!email || !validate(email)) {
        return res.json({ error: "email is required" });
    }

    if (!password || password.length < 6) {
        return res.json({ Error: "password is required and must be at least 6 characters" });
    }

    //Find user by email
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    // If user not found or password is incorrect return error
    if (!user || !(await authHelper.comparePassword(password, user.password))) {
        return res.json({ error: "Invalid email or password" });
    }

    //Generate JWT token
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRETE,
        { expiresIn: '2h' },
    );

    //Remove password from the returned user object
    delete user.password;

    return res.status(200).json({ token, user });
}

export default { register, login }