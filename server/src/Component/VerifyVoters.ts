import VotersModel from '../Schema/votersSchema';
import { ExpressTypes ,Messages} from './../Typing';




interface Code{
    code?:string
}

async function verifyVoters(_:any,{code}:Code ,{req}:ExpressTypes):Promise<Messages> {
    
    try{
    const id:string = req.userId

        if(!(await VotersModel.findById(id).where({ "securedDetails.code": code }))){
            return {
                message: "Invalid Code",
                success: false,
              };
        }
      
        const updateVerify = {
            verifyCode:true, 
        }
      const user =  await VotersModel.findOneAndUpdate({_id:id} ,updateVerify, {new:true})
        await VotersModel.findOneAndUpdate({_id:id} ,  {
            securedDetails:[{...user.securedDetails[0],code:''}]
        })


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

export default verifyVoters