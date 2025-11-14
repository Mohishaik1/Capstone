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

// CORS configuration
const corsOptions = {
  origin: [
    'https://www.mohiddinsharieff.xyz',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api/user', userRouter);
app.use('/api/user', routing);
app.use('/api/user', router);

const buildPath = path.join(__dirname, "dist");
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
    console.warn(`Static build not found at ${buildPath}. Run "npm run build" in the client project and redeploy.`);  
}


app.listen(PORT, () => {
  console.log(`Server is up and running at port ${5500}`);
});