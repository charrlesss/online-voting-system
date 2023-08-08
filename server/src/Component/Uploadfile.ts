import { ExpressTypes ,Messages} from './../Typing';
import fs from 'fs'
import path  from 'path'
import {v4 as uuidv4} from 'uuid'

interface UploadFileType{
    message:string
    success:boolean
    filename:string
}



export default async function UploadFile(_:any, {file}:any,{res}:ExpressTypes):Promise<UploadFileType>{
 
    try{
        const {filename,createReadStream} = await file

        const stream = createReadStream()
        const extention = path.extname(filename)
        const newFileName = `${uuidv4()}${extention}`
        const recicle = 'E:/Charles/Projects/OVS/client/public/container/'
   
        if(file ){
        
            await stream.pipe(fs.createWriteStream(`${recicle}/${newFileName}`))
           
            return {
                message:'successfull',
                success:true,
                filename:newFileName
            }
        }

      
        return {
            message:'successfull',
            success:true,
            filename:newFileName
        }
      

    }catch(err){
        console.log('heres')
        return {
            message:'successfull',
            success:false,
            filename:''
        }
    }
  
}