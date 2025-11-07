import express from 'express';
// import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

//Schema
import registerModel from "../models/Users.js";


const router = express.Router();




router.post('/register', async (req,res)=>{
    try {

        const found = await registerModel.findOne({email:req.body.email});
        if(found){
            console.error("User already registered with this email");
            return res.json({error:"User already registered with this email"})
        }
        const hash = await bcrypt.hash(req.body.psw, 12);
         
        req.body.psw = hash;
        console.log(req.body.psw);

        const formData = await registerModel(req.body);
        await formData.save();
        res.status(200).json({success:"user registered"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})

router.post('/login', async (req,res)=>{
    try {
        const {email,psw}  = req.body;
        const user = await registerModel.findOne({email});

        if(user){
            console.log(user.psw, user.email);
            var comparehash = await bcrypt.compare(psw, user.psw);
        }

        if (!user) {
            console.error("This email is not associated whith any account");
            return res.json({error:"This email is not associated whith any account"})
        }else if(!comparehash){
                console.error("Incorrect Password");
                return res.json({error:"Incorrect Password"})
        }

        let payload = {
            id: user._id,
            email: user.email
        }

        let jsonToken = jwt.sign(payload, config.get('SECRET_KEY.JWT'), {expiresIn:'1h'});
        console.log(jsonToken);

        res.status(200).json({status:"User Verified",
            token:jsonToken
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
})


router.get('/auth', async (req,res)=>{
    try {
        let decoded = jwt.verify(req.headers["token"],config.get("SECRET_KEY.JWT"));
        console.log(decoded);
        console.log(req.headers);
        res.status(200).json({status:true});
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"token expired or token error"})
    }
})



export default router;