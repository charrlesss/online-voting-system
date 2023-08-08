import { ExpressTypes, Messages } from './../Typing';
import VotersModel from "../Schema/votersSchema";


interface UserDetails{
    filename:string
    municipality:string
    zipcode:string
    birthdate:string
    address:string
}


export default async function basicDetails(_:any, userDetails:UserDetails,{req}:ExpressTypes):Promise<Messages>{
    try{
    const _id = req.userId
        
    await VotersModel.findOneAndUpdate({_id} , {credential:true ,   $push : {
        basicDetails:userDetails
     }} , {new:true})
 

     return {
         message:'create account successfully.',
         success:true
     }
 
    }catch(err){
         return {
             message:'Server Error',
             success:false
         }
    }
 }