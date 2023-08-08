import generateCode from '../CustomFunction/generateCode';
import { verifyAccountFromEmail } from '../CustomFunction/sendEmail';
import VotersModel from '../Schema/votersSchema';
import { ExpressTypes ,Messages} from './../Typing';


export default async function resend(_:any, __:any, { req }:ExpressTypes):Promise<Messages>{
    try{
    const id = req.userId
    const user = await VotersModel.findById(id);
    const code = generateCode();

  const updateUser =  await VotersModel.findOneAndUpdate({_id:id} , {
        securedDetails:[{...user.securedDetails[0],code:code}]
    } ,{new:true})
    await verifyAccountFromEmail(updateUser.securedDetails[0].email, updateUser.securedDetails[0].code);

        return {
            message: "Resend code successfully",
            success: true,
        }

    }catch(err){
        return {
            message: `SERVER ERROR ${err}`,
            success: false,
        }
    }
}