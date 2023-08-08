import bcryptjs from "bcryptjs";
import { UserType ,Messages } from "../Typing";




async function authenticateUsers(getUserByEmail:()=>Promise<(UserType[])>, password:string, done:(err:( unknown|Error | null) ,user?:(null | UserType ), message?:{message:string})=>Promise<Messages>):Promise<Messages> {
  try {
    const user:any= await getUserByEmail();
    const findUser:UserType[] = []
    let checker = false

    for(let i:number = 0 ; i <  user.length; i++){
      checker =true
      if(await bcryptjs.compare(password,  user[i].securedDetails[0].password)){
        findUser.push(user[i])
        break
      }
     
    }

    if (user.length === 0 && !checker)
      return await done(null,null, { message: "No username found!" });

    if (findUser.length === 0 && checker) {
      return await done(null,null, { message: "Password incorrect!" });
    }

    return await done(null,findUser[0]);
  } catch (err) {
     return done(err);
  }
}

export default authenticateUsers;
