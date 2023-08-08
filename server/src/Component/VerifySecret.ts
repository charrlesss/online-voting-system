import { ExpressTypes ,Messages} from './../Typing';
import Employee from '../Schema/employeeSchema';
import Admin from '../Schema/adminSchema';
interface Code{
    code?:string
}

async function verifySecret(_:any,{code}:Code ,{req}:ExpressTypes):Promise<Messages> {
    
    try{

    const _id:string = req.userId
      console.log(code)
         const user =  await Employee.findById(_id).where({"securedDetails.code":code}) ||  await Admin.findById(_id).where({"securedDetails.code":code}) 

        if(!user){
            return {
                message: "Invalid Code",
                success: false,
              };
        }
        await Admin.findOneAndUpdate({_id:user._id} ,{"redirect":true} ,{new:true}) ||
        await Employee.findOneAndUpdate({_id:user._id} ,{"redirect":true} ,{new:true}) 


    return {
        message: "successfull create account",
        success: true,
      };
    }catch(err){
     return {
        message: `SERVER ERROR : ${err}`,
        success: false,
      };
    }
}

export default verifySecret