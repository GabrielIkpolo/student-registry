import { PrismaClient } from "@prisma/client";

// initialize the prisma client 
const prisma = new PrismaClient();

// Get All Students by Level
const getStudentByLevel = async (req, res) => {
    const { level } = req.params;
    // console.log(level);
    try {

        const student = await prisma.student.findMany({
            where: { level: level },
        });

        if (!student) {
            return res.json({ error: `student with ${level} was not found` });
        }

        return res.status(200).json(student);

    } catch (error) {
        console.log("Error retrieving students by Level", error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}

// Get all Students by Department
const getAllStudentsByDepartment = async (req, res) => {
    const { department } = req.params;

    try {
        const students = await prisma.student.findMany({
            where: { department: department },
        });

        if (!students) {
            return res.json({ error: `No Student with the ${department} found` });
        }

        return res.json(students);
    } catch (error) {
        console.error("Error retriving students by department",error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}




export default { getStudentByLevel, getAllStudentsByDepartment }




