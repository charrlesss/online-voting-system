import { createContext } from "react";


export interface DetailsContext{
    address?:string
    birthdate?:string
    municipality?:string
    profile?:string
    zipcode?:string,
    messages?:any,
    socket?:any,
    sideBarAdjust?:any
}

const defaultValue:DetailsContext ={
    address:'',
    birthdate:'',
    municipality:'',
    profile:'',
    zipcode:'',
    messages:[],
    socket:null,
    sideBarAdjust:null
}



const useDetailsContext = createContext<DetailsContext>(defaultValue)

export default useDetailsContext