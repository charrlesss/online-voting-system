import { ExpressTypes, Messages } from "../Typing";
import SampleRegisteredVoters from '../Schema/sampleRegisteredVoters'
import WaitingToVerify from '../Schema/waitingToVerify'
import VotersModel from '../Schema/votersSchema'
import {verifyAccountToVotedWaiting ,verifyAccountToVotedSuccess} from '../CustomFunction/sendEmail'
import { GLOBAL_SOCKET } from "../CustomFunction/socket";
import Activity from "../Schema/activity";

interface VerifyVoters {
    verifyVotersIDNumber:string | null
    verifyVotersPrecinct:string | null
    verifyVotersFullname:string | null
    verifyVotersPicture:string
    verifyVotersIdPicture:string
  }
  
export default  async function verifyVotersToValidVoters(_:any,args:VerifyVoters ,{req}:ExpressTypes):Promise<Messages> {
    const VerifyVotersProcess:any= ():Promise<Messages>=>{
        return new Promise((resolve ,reject)=>{
            setTimeout(async()=>{
                try{
                    const {verifyVotersFullname ,verifyVotersPrecinct ,verifyVotersIDNumber ,verifyVotersIdPicture ,verifyVotersPicture}:VerifyVoters = args
                   const findUser:VerifyVoters[] = []
                    if(verifyVotersFullname && !verifyVotersPrecinct && !verifyVotersIDNumber){
                        const userVerify:any =  await SampleRegisteredVoters.find({firstName:verifyVotersFullname?.split(',')[1].toLocaleLowerCase()})
                        .where({lastName:verifyVotersFullname?.split(',')[0].toLocaleLowerCase()})
                        .where({middleName:verifyVotersFullname?.split(',')[2].toLocaleLowerCase()})
                        if(userVerify.length === 0){
                            return    resolve(  {
                                message:'Any person qualified to vote shall register ',
                                success:false
                            })
                        }
                        if(userVerify[0].isVoted){
                            return    resolve(  {
                                message:'Oppss this voter is already vote.',
                                success:false
                            })
                        }
                        if(userVerify[0].waiting){
                            return  resolve({
                                message:'This voter is attemp to verified her/his account and waiting for response',
                                success:false
                            })
                         }
                         if(userVerify[0].verifiedVoters){
                            return  resolve({
                                message:'This voter is attemp to verified her/his account and the accoount is already verified',
                                success:false
                            })
                         }
                        await verifyAccountToVotedWaiting(req.userEmail , 'Your Account is Under Review , You will recieve  an email once verification is complete')
                       const voters =  await VotersModel.findOneAndUpdate({_id:req.userId} ,{waitingVerified:true})
                        await SampleRegisteredVoters.findOneAndUpdate({_id:userVerify[0]._id} ,{waiting:true ,userId:req.userId})
                    
                       new WaitingToVerify({
                            ovsId:userVerify[0]._id.toString(),
                           firstName:userVerify[0].firstName,
                           lastName:userVerify[0].lastName,
                           middleName:userVerify[0].middleName,
                           votersIdPicture:verifyVotersIdPicture,
                             votersPicture:verifyVotersPicture
                       }).save()
                     await messagesVerifyNotif(`${voters.fullname} is waiting to verified account.`)

                       return  resolve({
                        message:'Your Account is Under Review , You will recieve  an email once verification is complete',
                        success:true
                     })
            
                    }
                    if(verifyVotersFullname && verifyVotersPrecinct && !verifyVotersIDNumber){
                        const userVerify:any =  await SampleRegisteredVoters.find({firstName:verifyVotersFullname?.split(',')[1].toLocaleLowerCase()})
                        .where({lastName:verifyVotersFullname?.split(',')[0].toLocaleLowerCase()})
                        .where({middleName:verifyVotersFullname?.split(',')[2].toLocaleLowerCase()})
                        .where({precinct:verifyVotersPrecinct})
                        
                        if(userVerify.length === 0){
                          return  resolve({
                                message:'Any person qualified to vote shall register ',
                                success:false
                            })
                        }
                        if(userVerify[0].isVoted){
                            return    resolve(  {
                                message:'Oppss this voter is already vote.',
                                success:false
                            })
                        }
                        if(userVerify[0].waiting){
                            return resolve({
                                message:'This voter is attemp to verified her/his account and waiting for response',
                                success:false
                            })
                        }
                        if(userVerify[0].verifiedVoters){
                            return resolve({
                                message:'This voter is attemp to verified her/his account and the accoount is already verified',
                                success:false
                            })
                        }
            
                        await SampleRegisteredVoters.findOneAndUpdate({_id:userVerify[0]._id} ,{verifiedVoters:true ,userId:req.userId})
                        findUser.push(userVerify)
                    }
                    if(verifyVotersFullname && !verifyVotersPrecinct && verifyVotersIDNumber){
                        const userVerify:any =  await SampleRegisteredVoters.find({firstName:verifyVotersFullname?.split(',')[1].toLocaleLowerCase()})
                        .where({lastName:verifyVotersFullname?.split(',')[0].toLocaleLowerCase()})
                        .where({middleName:verifyVotersFullname?.split(',')[2].toLocaleLowerCase()})
                        .where({votersIdNumber:verifyVotersIDNumber})
            
                        if(userVerify.length === 0){
                            return  resolve({
                                message:'Any person qualified to vote shall register ',
                                success:false
                            })
                        }
                        if(userVerify[0].isVoted){
                            return    resolve(  {
                                message:'Oppss this voter is already vote.',
                                success:false
                            })
                        }
                        if(userVerify[0].waiting){
                            return resolve({
                                message:'This voter is attemp to verified her/his account and waiting for response',
                                success:false
                            })
                        }
                        if(userVerify[0].verifiedVoters){
                            return resolve({
                                message:'This voter is attemp to verified her/his account and the accoount is already verified',
                                success:false
                            })
                        }
                        await SampleRegisteredVoters.findOneAndUpdate({_id:userVerify[0]._id} ,{verifiedVoters:true ,userId:req.userId})
                        findUser.push(userVerify)
                    }
                    if(verifyVotersFullname && verifyVotersPrecinct && verifyVotersIDNumber){
                        const userVerify:any =  await SampleRegisteredVoters.find({firstName:verifyVotersFullname?.split(',')[1].toLocaleLowerCase()})
                        .where({lastName:verifyVotersFullname?.split(',')[0].toLocaleLowerCase()})
                        .where({middleName:verifyVotersFullname?.split(',')[2].toLocaleLowerCase()})
                        .where({votersIdNumber:verifyVotersIDNumber})
                        .where({precinct:verifyVotersPrecinct})
                        if(userVerify.length === 0){
                            return   resolve({
                                message:'Any person qualified to vote shall register ',
                                success:false
                            })
                        }
                        if(userVerify[0].isVoted){
                            return    resolve(  {
                                message:'Oppss this voter is already vote.',
                                success:false
                            })
                        }
                        if(userVerify[0].waiting){
                            return  resolve({
                                message:'This voter is attemp to verified her/his account and waiting for response',
                                success:false
                            })
                        }
                        if(userVerify[0].verifiedVoters){
                            return resolve({
                                message:'This voter is attemp to verified her/his account and the accoount is already verified',
                                success:false
                            })
                        }
                        await SampleRegisteredVoters.findOneAndUpdate({_id:userVerify[0]._id} ,{verifiedVoters:true ,userId:req.userId})
                        findUser.push(userVerify)
                    }
                     const voters =  await VotersModel.findOneAndUpdate({_id:req.userId} ,{verify:true})
                      
                       await verifyAccountToVotedSuccess(req.userEmail , 'Thank you, your email has been verified. your account is now active. Please use the link below to login to your account')
                        await messagesVerifyNotif(`${voters.fullname} is successfully verified account.`)
                   
                       return resolve({
                        message:`Your Barangay Online Voting account has been verified.`,
                        success:true
                    })
                }catch(err){
                    return reject({
                        message:`theres some error ${ err}`,
                        success:false
                    })
                }
            },5000)
        })
    }
  
    return await VerifyVotersProcess()

}



 async function messagesVerifyNotif(messages:string) {
    GLOBAL_SOCKET.emit("verify-messages" ,`${messages}` )

    const user = await VotersModel.findById(GLOBAL_SOCKET.handshake.auth.token)
    await new Activity({
        activityLog:messages,
        userID:GLOBAL_SOCKET.handshake.auth.token,
        isVoted:user.voted,
        isVerify:user.verify
      }).save()
    GLOBAL_SOCKET.broadcast.emit('server-recieve-message-connected',messages ,await Activity.find({}))
}