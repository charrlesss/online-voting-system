import { hashSync } from 'bcryptjs';
import { GLOBAL_SOCKET } from '../CustomFunction/socket';
import Activity from '../Schema/activity';
import VotersModel from '../Schema/votersSchema';
import { ExpressTypes, Messages } from './../Typing';

export default async function UpdateData(_:any ,{data}:{data:string} , {req}:ExpressTypes):Promise<Messages>{
    try{
        const myData = JSON.parse(data)
        Object.entries(myData).forEach(([key,value]:any)=>{
                filterData(key,value,req.userId)
        })
        
        return {
            success:true,
            message:`Update Success.`
        }
    }catch(err:any){
        return {
            success:false,
            message:`UpdateData Error : ${err}`
        }
    }


}


async function filterData(key:string , value:string ,userId:string){
    const voters:any =await VotersModel.findById(userId)
    const gender =(voters.gender=== "male"  || voters.gender=== "Male" )? "his" : "her"
    if(key === "fullname"){
        
        await VotersModel.findOneAndUpdate({_id:userId} ,{fullname:value})
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} fullname to ${value}`)
        return
    }else if(key === "birthdate"){
       const basicDetails = [{
         ... voters.basicDetails[0],
         birthdate:value
       }]
       await  messagesVerifyNotif(`${voters.fullname} is update ${gender} birthdate to ${value}`)
        await VotersModel.findOneAndUpdate({_id:userId} ,{basicDetails})
        return
    }else if(key === "gender"){
         await VotersModel.findOneAndUpdate({_id:userId} ,{gender:value})
         await  messagesVerifyNotif(`${voters.fullname} is update ${gender} gender to ${value}`)
         return
    }else if(key === "municipality"){
        const basicDetails = [{
          ... voters.basicDetails[0],
          municipality:value
        }]
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} municipality to ${value}`)
         await VotersModel.findOneAndUpdate({_id:userId} ,{basicDetails})
        return
    }else if(key === "zipcode"){
        const basicDetails = [{
          ... voters.basicDetails[0],
          zipcode:value
        }]
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} zipcode to ${value}`)
         await VotersModel.findOneAndUpdate({_id:userId} ,{basicDetails})
        return
    }else if(key === "address"){
        const basicDetails = [{
          ... voters.basicDetails[0],
          address:value
        }]
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} address to ${value}`)
         await VotersModel.findOneAndUpdate({_id:userId} ,{basicDetails})
        return
    }else if(key === "email"){
        const securedDetails = [{
          ...  voters.securedDetails[0],
          email:value
        }]
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} email to ${value}`)

         await VotersModel.findOneAndUpdate({_id:userId} ,{securedDetails})
        return
    }else if(key === "password"){
        const securedDetails = [{
          ...  voters.securedDetails[0],
          password:hashSync(value , 10)
        }]
        await  messagesVerifyNotif(`${voters.fullname} is update ${gender} password.`)
         await VotersModel.findOneAndUpdate({_id:userId} ,{securedDetails})
        return
    }else{
        return
    }
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