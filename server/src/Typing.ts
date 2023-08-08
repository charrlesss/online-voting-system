import {Request , Response , NextFunction} from 'express'


export interface ExpressTypes{
    req:Request,
    res:Response,
    next:NextFunction
}

export interface Messages{
    message?:string
    success?:boolean
}

export interface UserType{
   readonly _id?:(string | Object),
   readonly username?: string,
   readonly createdAt?:(string | Date | number),
   readonly authenticated?: boolean,
   readonly registed?: boolean,
   readonly verify?: boolean,
   readonly credential?: boolean,
   readonly title?: string,
   readonly code?: boolean
   readonly securedDetails:[{
    readonly email?: string,
    readonly password?:string,
   }]

  }