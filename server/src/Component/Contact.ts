import { feedbackFromEmail } from "../CustomFunction/sendEmail";
import { Messages } from "../Typing";

interface UserFeedBack{
    fullname:string,
    email:string ,
    message:string
}



export default async function contact(_:any, user:UserFeedBack):Promise<Messages>{
  try {
     await feedbackFromEmail(user);
    return {
      message: "message sent successfull",
      success:true
    };
  } catch (err) {
    return {
      message: `SERVER ERROR : ${err}`,
      success:false
    };
  }
}
