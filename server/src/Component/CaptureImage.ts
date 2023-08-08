import { Messages } from "../Typing";
import fs from 'fs'

export default async function CaptureImage(_:any, {filename}:{filename:string} ):Promise<Messages>{
    const saveIamge = ():Promise<Messages>=>{
        return new Promise((resolve ,reject)=>{
            setTimeout(()=>{
                fs.readFile(`C:/Users/NOT SET/Downloads/${filename}`, function (err, data) {
                    if (err) throw err;
                    console.log(data)
                    fs.writeFile(`E:/Charles/Projects/OVS/client/public/container/${filename}`, data, function (err) {
                        if (err) {
                            reject({
                                message:`not successfull:  ${err}`,
                                success:false
                            })
                        };
                        resolve({
                            message:filename,
                            success:true
                        })
                    });
                    
                });
            
               
            } ,1500)
        })
    }
   
    return  await saveIamge()
}