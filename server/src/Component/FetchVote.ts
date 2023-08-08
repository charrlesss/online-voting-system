import VotersModel from "../Schema/votersSchema";
import { ExpressTypes } from "../Typing";

export default async function fetchVote(_:any,__:any,{req}:ExpressTypes) {
   const user =  await VotersModel.findById(req.userId)
    return user.voteList
} 