import express from "express";
import cors from 'cors';
// import bcrypt from 'bcrypt';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//db
import './utils/dbConnect.js';

//Controllers
import userRouter from './controllers/UsersControllers.js';
import routing from "./controllers/contactController.js";
import router from "./controllers/PackageControllers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5500;
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/user', routing);
app.use('/api/user', router);

const buildPath = path.join(__dirname, "build");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}


app.get('/', (req,res)=>{
    try {
        res.send(`Express running at port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})




app.listen(PORT,()=>{
    console.log(`Server is up and running at port ${5500}`)
})