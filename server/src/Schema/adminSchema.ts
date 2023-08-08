
import mongoose  from "mongoose";

const admin = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()).toLocaleString(),
    },
    authenticated: {
    type: Boolean,
     default: false
     },
     redirect:{
      type: Boolean,
     default:false
     },
     registered: {
    type: Boolean,
    default: false 
    },
    secret: { 
        type: Boolean, 
        default: true
     },
     credential: {
        type: Boolean,
        default: false
     },
    title: {
      type: String,
      default: "admin",
    },
    urlID:{
      type: String,
      default: '',
    },
    verifyCode:{
      type:Boolean,
      default:false
    },
    log:{
      type:Array,
      default:[{
        login:{
          type:Date,
          default:new Date().toLocaleString()
        },
        logout:{
          type:Date,
          default:new Date().toLocaleString()
        }
      }]
    },
    securedDetails:{
	  type:Array,
   	default:[{
    email:{
      type: String,
      default:'',
    },
    password:{
      type: String,
      default:'',
    },
    code:{
      type: String,
      default:'',
    },
    refreshToken:{
      type: Array,
      default:[],
    }
     }]
   },
   basicDetails:{
      type:Array,
      default:[]
    },
    setSchedule:{
      type:Date,
      default:new Date().toLocaleString()
    }
  },
 
  { versionKey: false }
);


const Admin = mongoose.model<any>("AdminModel", admin);

export default Admin;

export async function sampleAdminAccount():Promise<void>{
  await new Admin({
    fullname: '',
    createdAt:new Date().toLocaleString(),
    authenticated: false,
     redirect:false,
     registered:true,
    secret: true,
     credential: true,
    title: "admin",
    urlID:'',
    verifyCode:true,
    log:[
      new Date().toLocaleString()
    ],
    securedDetails:[{
      email:'charlespalencia21@gmail.com',
      password:'$2a$10$fpPcE1fyiM2u39AlKVyhKOug3AIv1BaXUT1R9W5OYzlSLGWBLErxG',
      code:'',
      refreshToken:[]
    }],
   basicDetails:[],
  setSchedule:new Date().toLocaleString()
  }).save()
}
