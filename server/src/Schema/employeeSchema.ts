
import mongoose  from "mongoose";


const employee = new mongoose.Schema(
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
     registered: {
    type: Boolean,
    default: false 
    },
    urlID:{
      type: String,
      default: '',
    },
    secret: { 
        type: Boolean, 
        default: true
     },
     redirect:{
      type: Boolean,
     default:false
     },
     credential: {
        type: Boolean,
        default: false
     },
    title: {
      type: String,
      default: "employee",
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
   	default:[]
   },
   basicDetails:{
      type:Array,
      default:[{
        profile:{
          type: String,
          default:'',
        },
        address:{
          type: String,
          default:'',
        },
        birthdate:{
          type: String,
          default:'',
        }
     }]
    }
  },
{ versionKey: false }
);

const Employee = mongoose.model<any>("EmployeeModel", employee);

export default Employee;
