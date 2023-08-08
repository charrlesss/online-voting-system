import { NextFunction } from 'express';
import {Socket , Server} from 'socket.io'
import Activity from '../Schema/activity';
import Candidates from '../Schema/candidates';
import VotersModel from '../Schema/votersSchema';
import SampleRegisteredVoters from '../Schema/sampleRegisteredVoters';
export let GLOBAL_SOCKET:Socket;

export default async function sokcetMidlleware(io:Server ,socket:Socket,next:NextFunction):Promise<void>{
    const allUser = await VotersModel.find({})
    const findVoted = allUser.filter((data:any) => data.voted !== false) 
    const findNotVoted = allUser.filter((data:any) => data.voted !== true) 
    const findVeriedUser = allUser.filter((data:any) => data.verify !== false)
    const findNotVeriedUser = allUser.filter((data:any) => data.verify !== true)
    const candidatesAndPositon =await Candidates.find({})
    const sampleRegisterVoter = await SampleRegisteredVoters.find({})


    socket.emit('verifiedVoters' ,{
        notVoted:findNotVoted.length ,
        verified:findVeriedUser.length,
        notverified:findNotVeriedUser.length,
        voted:findVoted.length,
        voters:allUser.length,
        sampleRegisterVoter:sampleRegisterVoter.length,
      })
    
    socket.emit('connectedUser' , io.engine.clientsCount)
    socket.broadcast.emit('connectedUser' , io.engine.clientsCount)
    socket.emit('candidatesAndPosition' , candidatesAndPositon)
    
   await sendMessages(socket )
     
    socket.on('disconnectUser' ,async(user)=>{
      try{
    
        socket.broadcast.emit('connectedUser' , io.engine.clientsCount-1)
        const activity = await new Activity({
          activityLog: `${user.fullname} is Logout`,
          userID:socket.handshake.auth.token,
        })
        activity.save()
        socket.emit('fetchMessages' , await Activity.find({}))
        socket.broadcast.emit('server-recieve-message', `${user.fullname} is Logout` ,await Activity.find({}))
        
      }catch(err){
        next(new Error('SOCKET ERROR' + err))
      }
    })


    socket.emit('fetchMessages' , await Activity.find({}))
    
    GLOBAL_SOCKET = socket
    next()

}




export async function sendMessages(socket:Socket ,customMessages?:string | null){
  socket.on('message' ,async(message:string ,cb:any):Promise<void>=>{
    try{
      const user = await VotersModel.findById(socket.handshake.auth.token)
      const activity = await new Activity({
        activityLog:message || customMessages,
        userID:socket.handshake.auth.token,
        isVoted:user.voted,
        isVerify:user.verify
      })
      activity.save()
       socket.emit('fetchMessages' , await Activity.find({}))
     cb(await Activity.find({}))
      
      socket.broadcast.emit('server-recieve-message-connected',message ,await Activity.find({}))
    
    }catch(err){
     new Error('SOCKET ERROR' + err)
    }
  })
}