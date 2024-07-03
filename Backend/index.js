import express from "express";
import connectdb from "./database_conn.js"; 
import userroute from "./routes/userroute.js"
import msgroute from "./routes/messageroute.js"
import cookieParser from "cookie-parser";
import { app,server } from "./socket/socket.js";

import cors from 'cors'

const PORT = 8000;
// const app = express();

app.use(cookieParser());
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
}))


app.use("/user",userroute);
app.use("/message",msgroute);

server.listen(PORT, () => {
    connectdb();
    console.log(`Server is running on port ${PORT}`);
});
