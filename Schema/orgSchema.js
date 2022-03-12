import mongoose from 'mongoose';

const orgSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
    },
    owner:{
        type:Object,
        default:{},
        required: true
    },

    projects:{
        type:Array,
        default:[],
        required: true
    },
    employees:{
        type:Array,
        default:[],
        required: true
    },
    tickets:{
        type:Array,
        default:[],
        required: true
    }


},{timestamps: true})

const modal = mongoose.model("organization" , orgSchema)

export default modal