import express from "express";
import querryDbController from "../controller/querryDb.js";

// Initialise the express router 
const router = new express.Router();


router.get("/students/level/:level", querryDbController.getStudentByLevel);
router.get("/:department", querryDbController.getAllStudentsByDepartment);



export default router;