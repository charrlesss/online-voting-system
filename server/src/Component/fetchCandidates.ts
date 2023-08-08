import Candidates from '../Schema/candidates'
interface Candidates{
    FullName:string
    position:string
    profile:string
    votes:number
    voterReceiptId:string[]
}



export default async function fetchCandidates():Promise<(Candidates[] | Error)>{
    try{
        const candidates = await Candidates.find({})
        console.log(candidates)
        return candidates
    }catch(err){

        return new Error(`${err}`)
    }

}