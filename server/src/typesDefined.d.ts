declare module Express {
    export interface Request {
        username: string;
        userEmail:string,
        user:string,
        userId:string
    }
  }

  declare module 'cors'
 