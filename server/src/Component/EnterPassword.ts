import  bcryptjs  from 'bcryptjs';
import { ExpressTypes ,Messages } from './../Typing';
import VotersModel from '../Schema/votersSchema';

export default async function enterPassword(_:any,{password}:{password:string} ,{req}:ExpressTypes):Promise<Messages> {
    try{
        const voterPassword  = await VotersModel.findById(req.userId)
        if(await bcryptjs.compare(password ,voterPassword.securedDetails[0].password)){
            return {
                success:true,
                message:'Successfully'
            }
        }else{
            return {
                success:false,
                message:'Password do not match'
            }
        }
       
    }catch(err:any){
        return {
            success:false,
            message:`Enter Password Error : ${err}`
        }
    }
}