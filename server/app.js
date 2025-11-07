import express from "express";
import cors from 'cors';
// import bcrypt from 'bcrypt';

//db
import './utils/dbConnect.js';

//Controllers
import userRouter from './controllers/UsersControllers.js';
import routing from "./controllers/contactController.js";
import router from "./controllers/PackageControllers.js";



const PORT = 5500;
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/user', routing);
app.use('/api/user', router);


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