
import { ExpressTypes ,Messages } from '../Typing';
import VotersModel from "../Schema/votersSchema";
import Admin from '../Schema/adminSchema';
import Employee from '../Schema/employeeSchema';




export default async function logout(_:any,__:any,{req,res}:ExpressTypes):Promise<Messages>{
    try{
    const _id = req.userId
 
    const updatedUser = {
        authenticated:false,
        urlID:''
    }
    const upadate:any = {
        "redirect":false,
        "authenticated":false,
        "urlID":''
      }
      await Admin.findOneAndUpdate({_id} ,upadate ,{new:true}) ||
      await Employee.findOneAndUpdate({_id} ,upadate ,{new:true}) ||
    await VotersModel.findOneAndUpdate({_id} , updatedUser , {new:true})

    await Admin.updateOne({_id} ,{
        $push:{
          log:{
              logout:new Date().toLocaleString()
          }
        }
      })||
      await Employee.updateOne({_id} ,{
        $push:{
          log:{
              logout:new Date().toLocaleString()
          }
        }
      })||
      await VotersModel.updateOne({_id} ,{
        $push:{
          log:{
              logout:new Date().toLocaleString()
          }
        }
      })
      
      res.clearCookie("ACCESS_TOKEN");
      res.clearCookie("REFRESH_TOKEN");

 
     return {
         message:'logout successfully.',
         success:true
     }
 
    }catch(err){
         return {
             message:`Server Error ${err}`,
             success:false
         }
    }
 }