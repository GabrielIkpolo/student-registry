import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import studenRoute from './routes/studentRoute.js';
import querryDbRoute from "./routes/querryDbRoute.js";
import departmentsRoute from "./routes/departmentsRoute.js";
import userRoute from "./routes/userRoute.js";
import registerRoute from "./routes/registerRoute.js";
import loginRoute from "./routes/loginRoute.js";
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(cors());

const port = process.env.PORT || 8050;

// The end points 
app.use("/api", studenRoute);
app.use("/api", querryDbRoute);
app.use("/api/students", querryDbRoute);
app.use("/", departmentsRoute);

app.use("/api", userRoute);
app.use("/api", registerRoute);
app.use("/api", loginRoute);


app.get("/", (req, res) => {
    return res.json("Welcome to your  Student Registration Portal");
});



app.all('*', (req, res) => {
    return res.status(404).json({ error: "The requested path not found" });
});

app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
});