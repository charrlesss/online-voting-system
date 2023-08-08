
import mongoose  from "mongoose";


const candidates = new mongoose.Schema({
    FullName:{
        type:String,
        default:''
    },
    position:{
        type:String,
        default:''
    },
    votes:{
        type:Number,
        default:0
    },
    profile:{
        type:String,
        default:"icon-profile.jpg"
    },
    voterReceiptId:{
        type:Array,
        default:[]
    },
    backout:{
        type:Boolean,
        default:false
    }
},{versionKey:false})


const Candidates = mongoose.model('candidates',candidates)

export default Candidates




export async function createCandidates():Promise<void>{
    await new Candidates({FullName:'Malapitan, Along' ,position:'mayor'}).save()
    await new Candidates({FullName:'Domasig, Roman Jr' ,position:'mayor '}).save()
    await new Candidates({FullName:'Anquilan, Jun' ,position:'mayor'}).save()
    await new Candidates({FullName:'Bayoh-on Ruffy' ,position:'mayor'}).save()
    await new Candidates({FullName:'Erice , Egay' ,position:'mayor'}).save()
    await new Candidates({FullName:'Malunes , Toto' ,position:'mayor'}).save()
    await new Candidates({FullName:'Malonzo, pj' ,position:'vicemayor'}).save()
    await new Candidates({FullName:'Nubla, Alou' ,position:'vicemayor '}).save()
    await new Candidates({FullName:'Timbol Joseph' ,position:'vicemayor'}).save()
    await new Candidates({FullName:'Adalem, Topet' ,position:'msp'}).save()
    await new Candidates({FullName:'Aquino, Roberto jr' ,position:'msp'}).save()
    await new Candidates({FullName:'Assitio, Tonton' ,position:'msp'}).save()
    await new Candidates({FullName:'Bacolod, Leah' ,position:'msp'}).save()
    await new Candidates({FullName:'Caralde, Kap Alex' ,position:'msp'}).save()
    await new Candidates({FullName:'De Leon, Tyrone' ,position:'msp'}).save()
    await new Candidates({FullName:'Hernandez, Vince' ,position:'msp'}).save()
    await new Candidates({FullName:'Malapitan, Enteng' ,position:'msp'}).save()
    await new Candidates({FullName:'Maniago, Rodolfo' ,position:'msp'}).save()
    await new Candidates({FullName:'Mayor, Cenon' ,position:'msp'}).save()
    await new Candidates({FullName:'Nubla, Kaye' ,position:'msp'}).save()
    await new Candidates({FullName:'Repollo, Nick' ,position:'msp'}).save()
    await new Candidates({FullName:'Rivera, Romy' ,position:'msp'}).save()
    await new Candidates({FullName:'Trinidad, Inar' ,position:'msp'}).save()
    await new Candidates({FullName:'Uy, Mila' ,position:'msp'}).save()
    await new Candidates({FullName:'Viray, Gerry' ,position:'msp'}).save()
  }
  