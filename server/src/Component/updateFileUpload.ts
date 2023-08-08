import { ExpressTypes, Messages } from "../Typing";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import VotersModel from "../Schema/votersSchema";

interface UploadFileType {
  message: string;
  success: boolean;
  filename: string;
}

export default async function UpdateUploadFile(
  _: any,
  { file }: any,
  { req }: ExpressTypes
): Promise<UploadFileType> {
  try {
   
    const { filename, createReadStream } = await file;

    const stream = createReadStream()
    const extention = path.extname(filename)
    const newFileName = `${uuidv4()}${extention}`
    const voters:any =await VotersModel.findById(req.userId)
    voters.basicDetails[0]
    const basicDetails = [{
      ... voters.basicDetails[0],
      profile:newFileName
    }]
    await VotersModel.findOneAndUpdate({_id:req.userId},{basicDetails})
    const recicle = 'E:/Charles/Projects/OVS/client/public/container/'
    await stream.pipe(fs.createWriteStream(`${recicle}/${newFileName}`))
    return {
        message:'successfull',
        success:true,
        filename:newFileName
    }
    

  } catch (err) {
    console.log("heres");
    return {
      message: "successfull",
      success: false,
      filename: "",
    };
  }
}
