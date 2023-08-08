
import mongoose  from "mongoose";


const pendingVerified = new mongoose.Schema({
    ovsId:{
        type:String,
        default:''
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    middleName:{
        type:String,
        default:''
    },
    votersIdPicture:{
        type:String,
        default:''
    },
    votersPicture:{
        type:String,
        default:''
    }
},{versionKey:false})


const WaitingToVerify = mongoose.model('PendingVerified',pendingVerified)

export default WaitingToVerify