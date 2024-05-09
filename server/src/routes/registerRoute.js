import express from 'express'
import registerController from "../controller/userController.js" 


// Initialise express router 
const router = express.Router();

router.post("/register", registerController.register);

export default router;