import { ExpressTypes } from './../Typing';
import VotersModel from '../Schema/votersSchema'
import Admin from '../Schema/adminSchema'
import Employee from '../Schema/employeeSchema'

interface Details{
    profile?:string
    birthdate?:string
    municipality?:string
    zipcode?: string
    address?: string
  }

export default async function fetchBasicDetails(_:any,__:any,{req}:ExpressTypes):Promise<Array<Details>>{
    try{
     
        const userDetails = (
             (await Admin.findById(req.userId)) ||
             (await Employee.findById(req.userId)) ||
             (await VotersModel.findById(req.userId)) 
        )
   
        return userDetails.basicDetails.filter((data:any) =>Object.keys(data).length  !== 0)

    }catch(err){
        console.log('getDetails Eror: '+ err)
        return [] 
    }
    
}