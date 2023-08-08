import { UserType ,ExpressTypes ,Messages } from './../Typing';
import VotersModel from "../Schema/votersSchema";
import authenticateUser from './authenticateUser';
import generateAccessToken  ,{generateRefreshToken}from '../JWT/generateToken';





interface signinShapeData{
    email:string,
    password:string
}

async function votersignin(_:any, { email, password}:signinShapeData, { res }:ExpressTypes):Promise<Messages> {
  const login = await authenticateUser(
    async ():Promise<(UserType[])> => {
    

    const voters:UserType[] =  await VotersModel.find({"securedDetails.email":email})
  
   
    return voters as UserType[]
      
    },
    password,
    async (err:(unknown | Error | null) , user?:(UserType | null) , message?:{message:(string)}):Promise<Messages> => {
      if (err) {
        return {
             message: `ERRORR ${err}`,
             success:false,
        };
      }
      if (!user) {
        return {
          message:message ? message.message : '',
          success: false,
        };
      }


     const ACCESS_TOKEN:string = generateAccessToken({_id:user._id,email:user.securedDetails[0].email})
     const REFRESH_TOKEN:string = generateRefreshToken({_id:user._id,email:user.securedDetails[0].email})

     await VotersModel.findOneAndUpdate({_id:user._id} ,{"urlId":''} ,{new:true}) 

     const secure =user.securedDetails[0]
     const updateUser = {
          ...secure,
          refreshToken:[REFRESH_TOKEN],
          log:[{login:new Date().toLocaleString()}]
        }
    await VotersModel.findOneAndUpdate({_id:user._id} ,{securedDetails:[updateUser]})
      res.cookie("ACCESS_TOKEN", ACCESS_TOKEN ,{httpOnly:true , secure:true});
      res.cookie("REFRESH_TOKEN", REFRESH_TOKEN ,{httpOnly:true , secure:true});
      return {
        message: 'Successfully Login',
        success: true,
      }

    }
  );

  

  return login;
}

export default votersignin;
