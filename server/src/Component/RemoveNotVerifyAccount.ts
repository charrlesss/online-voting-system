import VotersModel from '../Schema/votersSchema';
import { ExpressTypes ,Messages } from './../Typing';




export default async function removeNotVerifyAccount(_:any, __:any, { req ,res}:ExpressTypes):Promise<Messages>{
    try {
        const _id =- req.userId
      await VotersModel.deleteOne({id:_id});
      res.clearCookie("ACCESS_TOKEN");
      res.clearCookie("REFRESH_TOKEN");
      return {
        message:'The System is Removing Your Account ',
        success: true,
      };

    } catch (err) {
      return {
        message:`SERVER ERROR${err}`,
        success: false,
      };
    }
  }
