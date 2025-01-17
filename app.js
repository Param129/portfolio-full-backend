import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/DBconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRouter.js"
import userRouter from "./routes/userRouter.js"
import timelineRouter from "./routes/timelineRouter.js"
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js"
import skillRouter from "./routes/skillRouter.js";
import projectRouter from "./routes/projectRouter.js";
import acheivementRouter from "./routes/acheivementsRouter.js"


const app =express();
dotenv.config({path:"./config/config.env"});



app.use(cors({
    origin:[process.env.PORTFOLIO_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true, // used to get files from frontend
    tempFileDir:"/tmp/"
}))



// all routes
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/acheivement", acheivementRouter);


// database connection
dbConnection();

// middleware that handle all errors
app.use(errorMiddleware);

export default app;