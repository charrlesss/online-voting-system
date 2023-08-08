import jwt from 'jsonwebtoken'

const generateAccessToken=(user:{_id:string |undefined | Object ,email:string |undefined}):string=>{
    return jwt.sign(user ,process.env.ACCESS_TOKEN as string ,{expiresIn:'5m'} )

}

export const generateRefreshToken=(user:{_id:string |undefined | Object ,email:string |undefined}):string=>{
    return jwt.sign(user ,process.env.REFRESH_TOKEN as string )
}

export default generateAccessToken