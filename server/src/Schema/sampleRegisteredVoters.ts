
import mongoose  from "mongoose";


const sampleRegisteredVoters = new mongoose.Schema({
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
    precinct:{
        type:String,
        default:''
    },
    votersIdNumber:{
        type:String,
        default:''
    },
    votersFile:{
        type:Array,
        default:[]
    },
    votersPicture:{
        type:String,
        default:''
    },
    dateRegistered:{
        type:Date,
        default:new Date().toLocaleString()
    },
    verifiedVoters:{
        type:Boolean,
        default:false
    },
    waiting:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        default:""
    },
    isVoted:{
        type:Boolean,
        default:false
    }
},{versionKey:false})


const SampleRegisteredVoters = mongoose.model('SampleRegisteredVoters',sampleRegisteredVoters)

export default SampleRegisteredVoters




export async function sampleVotes():Promise<void>{
    await new SampleRegisteredVoters({
     firstName:"Charles",
     lastName:"Palencia",
     middleName:"Andrecoso",
     precinct:"0398A",
     votersIdNumber:"7502-0398B-G0987ANT10000",
     votersFile:['birthcSample.png','anyIdSample.jpg'],
     votersPicture:"votersIDSampole.jpg"
    }).save()
    await new SampleRegisteredVoters({
     firstName:"Catherine",
     lastName:"Oliverio",
     middleName:"Luha",
     precinct:"0398B",
     votersIdNumber:"7502-0398B-G0987ANT10000",
     votersFile:['birthcSample.png','anyIdSample.jpg'],
     votersPicture:"votersIDSampole.jpg"
    }).save()
    await new SampleRegisteredVoters({
     firstName:"Joan Clarence",
     lastName:"Francisco",
     middleName:"gin",
     precinct:"0398C",
     votersIdNumber:"7502-0398B-G0987ANT10000",
     votersFile:['birthcSample.png','anyIdSample.jpg'],
     votersPicture:"votersIDSampole.jpg"
    }).save()
    await new SampleRegisteredVoters({
     firstName:"Jan Carlo",
     lastName:"Castro",
     middleName:"Redhorse",
     precinct:"0398D",
     votersIdNumber:"7502-0398B-G0987ANT10000",
     votersFile:['birthcSample.png','anyIdSample.jpg'],
     votersPicture:"votersIDSampole.jpg"
    }).save()
    await new SampleRegisteredVoters({
     firstName:"Carla",
     lastName:"Vigilia",
     middleName:"Sanmig",
     precinct:"0398E",
     votersIdNumber:"7502-0398B-G0987ANT10000",
     votersFile:['birthcSample.png','anyIdSample.jpg'],
     votersPicture:"votersIDSampole.jpg"
    }).save()
   }