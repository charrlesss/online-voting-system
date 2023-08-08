
import { ExpressTypes } from '../Typing';
import VotersModel from "../Schema/votersSchema";
import Employee from '../Schema/employeeSchema';
import Admin from '../Schema/adminSchema';
import {v4 as uuidv4} from 'uuid'

interface Authenticated{
    message:string
    success:boolean
    urlID:string
}

export default async function authenticated(_:any,__:any,{req}:ExpressTypes):Promise<Authenticated>{

  const authentication = ():Promise<Authenticated>=>{
    return new Promise((resolve ,reject)=>{

        setTimeout(async()=>{
          try{
            const _id = req.userId
            const urlID = uuidv4()
        
            const updatedUser:any = {
                authenticated:true,
                urlID
            }
        
           
            await VotersModel.findOneAndUpdate({_id} , updatedUser , {new:true}) ||
            await Employee.findOneAndUpdate({_id} , updatedUser , {new:true}) ||
            await Admin.findOneAndUpdate({_id} , updatedUser , {new:true}) ||
        
            await Admin.updateOne({_id} ,{
                $push:{
                  log:{
                      login:new Date().toLocaleString()
                  }
                }
              }) ||
              await Employee.updateOne({_id} ,{
                $push:{
                  log:{
                      login:new Date().toLocaleString()
                  }
                }
              }) ||
              await VotersModel.updateOne({_id} ,{
                $push:{
                  log:{
                      login:new Date().toLocaleString()
                  }
                }
              })
        
             return resolve({
                 message:'create account successfully.',
                 success:true,
                 urlID
             })
         
            }catch(err){
                 return reject({
                     message:`Server Error ${err}`,
                     success:false,
                     urlID:''
                 })
            }
        },3000)

    })
  } 
  
  return await authentication()
 }