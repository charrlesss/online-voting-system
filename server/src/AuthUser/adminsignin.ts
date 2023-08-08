import { UserType ,ExpressTypes ,Messages } from './../Typing';
import Admin from "../Schema/adminSchema";
import authenticateUser from './authenticateUser';
import generateAccessToken, { generateRefreshToken } from '../JWT/generateToken';





interface signinShapeData{
    email:string,
    password:string
}

async function adminsignin(_:any, { email, password}:signinShapeData, { res }:ExpressTypes):Promise<Messages> {

  const login = await authenticateUser(
    async ():Promise<(UserType[])> => {
    
    const admin:UserType[]  =   await Admin.find({"securedDetails.email":email})
   
    return admin as UserType[]
      
    },
    password,
    async (err:(unknown | Error | null) , user?:(UserType | null) , message?:{message:(string)}):Promise<Messages> => {
      if (err) {
        return {
             message: `ERRORR ${err}`,
             success:false
        };
      }
      if (!user) {
        return {
          message:message ? message.message : '',
          success: false
        };
      }
     
      
      const ACCESS_TOKEN:string = generateAccessToken({_id:user._id,email:user.securedDetails[0].email})
      const REFRESH_TOKEN:string = generateRefreshToken({_id:user._id,email:user.securedDetails[0].email})
    
      const secure =user.securedDetails[0]
      const updateUser = {
        ...secure,
        refreshToken:[REFRESH_TOKEN]
      }
      const upadate:any = {
        "redirect":true,
        "authenticated":true,
        "urlID":user._id,
        securedDetails:[updateUser],
        log:[{login:new Date().toLocaleString()}]
      }
   
    await Admin.findOneAndUpdate({_id:user._id} ,upadate ,{new:true}) 
      res.cookie("ACCESS_TOKEN", ACCESS_TOKEN);
      res.cookie("REFRESH_TOKEN", REFRESH_TOKEN);
      return {
        message: 'Successfully Login',
        success: true
      }

    }
  );

  

  return login;
}

export default adminsignin;
