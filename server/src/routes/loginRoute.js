import express from 'express'
import loginController from "../controller/userController.js"
import authMiddleware from '../middleware/authMiddleware.js';


// // Initialise express router 
const router = express.Router();

router.post("/login", loginController.login);

router.post("/login", authMiddleware.requireSignin, authMiddleware.isAdmin,
    loginController.login);

export default router;