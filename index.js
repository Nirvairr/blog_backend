

import express from "express"; 
import connectToMongo from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/userRoutes.js"; 
import blogrouter from "./Routes/blogRoutes.js";
import dotenv from 'dotenv';
dotenv.config();// Load environment variables


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use( 
  cors({
    origin: "*",
    credentials: true,
  })
);

connectToMongo();

app.use("/auth", router);
app.use("/blog", blogrouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
