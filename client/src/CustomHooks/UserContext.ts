import { createContext } from "react";


export interface UserContext{
authenticated?: boolean
credential?: boolean
registered?: boolean
fullname?: string
verifyCode?: boolean
urlID?:string
title?:string
secret?:boolean
redirect?:boolean
basicDetails?:any
_id?:any
verify:boolean
waitingVerified:boolean
voted:boolean,
gender?:string
}

const defaultValue:UserContext ={
    authenticated: false,
    credential: false,
    registered: false,
    fullname: '',
    verifyCode: false,
    urlID:'',
    title:'',
    secret:false,
    redirect:false,
    verify:false,
    waitingVerified:false,
    _id:'',
    basicDetails:[],
    voted:false,
    gender:""
}



const userContext = createContext<UserContext>(defaultValue)

export default userContext