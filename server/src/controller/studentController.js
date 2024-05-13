import { PrismaClient } from "@prisma/client";

// Initialize the prisma client
const prisma = new PrismaClient();

// Predefined array of departments
const departments = [
    'Accounting',
    'Agric Engineering',
    'Anatomy',
    'BCH',
    'Biology',
    'Busssiness Administration',
    'Chemistry',
    'Civil Engineering',
    'Computer Engineering',
    'Computer Information Science',
    'Computer Information Technology',
    'Computer Science',
    'Cyber Security',
    'Economics',
    'Electrical Electronics Engr',
    'Engineering',
    'Law',
    'LIS',
    'mass Comm.',
    'Mathematics',
    'MCB',
    'Mechanical Engineering',
    'MLS',
    'Nursing',
    'Physics',
    'Physiology',
    'Political Science',
    'Public Admin.',
    'Public Health',
    'Software Engineering'
];


//Function to get all departments
const getDepartments = (req, res) => {
    try {
        return res.status(200).json(departments);
    } catch (error) {
        console.error("error fetching departments", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Create a student record
const register = async (req, res) => {
    const { email, fullName, department, level, matriculationNumber, phoneNumber } = req.body;
    try {
        // Checks if email exists
        const emailExist = await prisma.student.findUnique({
            where: { email: email },
        });

        if (emailExist) {
            return res.json({error :"Email already exist"});
        }

        //Checks if department exists in the predefined array
        if (!departments.includes(department)) {
            return res.json({ Error: "Department does not exist" });
        }

        const student = await prisma.student.create({
            data: {
                email,
                fullName,
                department,
                level,
                matriculationNum: matriculationNumber,
                phoneNumber
            },
        });

        return res.status(200).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}


// Get all Students records
const getAllStudents = async (req, res) => {
    try {

        const students = await prisma.student.findMany();
        return res.json(students);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// Update a student by email or matric number
const updateStudent = async (req, res) => {
    const { identifier } = req.params;
    const { email, matriculationNumber, fullName, department, level, phoneNumber } = req.body;

    try {

        // Checks if student exists
        let student;
        if (email) {
            student = await prisma.student.findUnique({
                where: { email, },
            });
        } else if (matriculationNumber) {
            student = await prisma.student.findUnique({
                where: {
                    matriculationNum: matriculationNumber,
                },
            });
        }

        if (!student) {
            return res.json({ error: "Student not found" });
        }

        // Update the student 
        const updatedStudent = await prisma.student.update({
            where: { id: student.id },
            data: {
                email,
                fullName,
                department,
                level,
                matriculationNum: matriculationNumber,
                phoneNumber,
            },
        });

        return res.status(200).json(updatedStudent);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}


//Delete a student by email or Matriculation number
const deleteStudent = async (req, res) => {

    const identifier = req.params.identifier;
    // console.log(identifier);

    try {
        // Checks if student exists
        let student;
        if (identifier.includes("@")) {

            student = await prisma.student.findUnique({
                where: { email: identifier },
            });

        } else {
            student = await prisma.student.findMany({
                where: { matriculationNum: identifier },
            });
        }

        if (!student || (Array.isArray(student) && student.length === 0)) {
            return res.json({ error: "Student not found" });
        }

        // If student is an array, pick the first one
        const studentToDelete = Array.isArray(student) ? student[0] : student;

        // Now delete the student when found

        await prisma.student.delete({
            where: {
                id: studentToDelete.id,
            },
        });

        return res.json({ message: "Student deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}



export default {
    register, getAllStudents,
    updateStudent, deleteStudent, getDepartments
}