import VotersModel from '../Schema/votersSchema';
import { ExpressTypes } from './../Typing';

interface FetchSecuredDetailsType{
    email:string
}

export default async function fetchSecuredDetails(_:any , __:any , {req}:ExpressTypes):Promise<FetchSecuredDetailsType> {
    try{
        const fetchSecuredDetails = await VotersModel.findById(req.userId)
        return fetchSecuredDetails.securedDetails
    }catch(err:any){
        return err
    }

}