    import express ,{ urlencoded} from 'express';

    import cookieParser from "cookie-parser";
    import dotenv from "dotenv";
    import cors from "cors";
    import connectDB from "./utils/db.js";
    import userRoute from "./routes/user.route.js";
    import postRoute from "./routes/post.route.js";
    import path from "path";
    import {app , server, io} from './socket/socket.js';



    dotenv.config();

    const PORT = process.env.PORT || 3000;

    const __dirname = path.resolve();
//


    //middlewares
    app.use(express.json());
    app.use(cookieParser());
    app.use(urlencoded({ extended: true }));
    const corsOptions = {
        origin: process.env.URL_URL,
        credentials: true
    }
    app.use(cors(corsOptions));


    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/post", postRoute);


    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })


    server.listen(PORT, () => {
        connectDB();
        console.log(`Server is running on port ${PORT}`);
    });
