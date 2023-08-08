import VotersModel from "../Schema/votersSchema";
import Employee from "../Schema/employeeSchema";
import Admin from "../Schema/adminSchema";


export default async function useFindUserById(id:string):Promise<any> {
    return (
        await VotersModel.findById(id) ||
        await Employee.findById(id) ||
        await Admin.findById(id)
         )
}