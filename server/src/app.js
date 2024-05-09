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

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"]
}));

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


// Error handling middleware (optional)
// app.use((err, req, res, next) => {
//     console.error(err.stack); // Log errors for debugging
//     res.status(err.statusCode || 500).json({ error: err.message }); // Send error response
// });

app.all('*', (req, res) => {
    return res.status(404).json({ error: "The requested path not found" });
});

app.listen(port, () => {
    console.log(`App is listening on port : ${port}`);
});