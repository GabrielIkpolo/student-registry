import express from 'express'
import studentController from "../controller/studentController.js"

// Initialise express router 
const router = express.Router();


router.get("/student", studentController.getAllStudents);
router.post("/student", studentController.register);
router.put("/student/:identifier", studentController.updateStudent);
router.delete("/student/:identifier", studentController.deleteStudent);


export default router;



