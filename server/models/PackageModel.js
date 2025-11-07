import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    departureDate:{
        type:Date,
        required:true
    },
    image:{
        type:String,  // Store image as base64 string
        required:false,
        default:''
    }
})

const packageModel = mongoose.model('Package', packageSchema, 'Packages');

export default packageModel;