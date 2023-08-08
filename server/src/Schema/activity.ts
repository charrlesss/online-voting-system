
import mongoose  from "mongoose";


const activity = new mongoose.Schema({
    activityLog:{
        type:String,
        default:''
    },
    date:{
        type:Date,
        default:new Date().toLocaleDateString()
    },
    userID:{
        type:String,
        default:''
    },
    isVoted:{
        type:Boolean,
        default:false
    },
    isVerify:{
        type:Boolean,
        default:false
    }
},{versionKey:false})


const Activity = mongoose.model('Activities',activity)

export default Activity