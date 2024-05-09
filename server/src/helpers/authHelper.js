import bcrypt from "bcrypt";


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(14)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password", error);
        throw error;
    }
}

const comparePassword = async (password, hashed) => {
    try {
        const isMatch = await bcrypt.compare(password, hashed);
        return isMatch;
    } catch (error) {
        console.error("Error comparing password", error);
        throw error;
    }
}


export default {hashPassword, comparePassword}