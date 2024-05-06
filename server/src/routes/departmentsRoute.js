import express from 'express'
import studentController from "../controller/studentController.js"

// Initialise express router 
const router = express.Router();

router.get("/the-department", studentController.getDepartments);

export default router;