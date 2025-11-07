//Modules
import express from 'express';


//Schema
import contactModel from '../models/Contact.js';

const routing = express.Router();

//Api for posting in DB
routing.post('/contact', async (req,res)=>{
    try {
        const contactForms = await contactModel(req.body);
        console.log(req.body);
        await contactForms.save();
        res.status(200).json({success:"Form Submitted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})

//Api for getting all contact forms
routing.get('/contact', async (req,res)=>{
    try {
        const contactForms = await contactModel.find().sort({created: -1});
        res.status(200).json(contactForms)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})

//Api for deleting a contact form
routing.delete('/contact/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        await contactModel.findByIdAndDelete(id);
        res.status(200).json({success:"Contact form deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
})

export default routing;