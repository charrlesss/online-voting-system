import Candidates from "../Schema/candidates";
import VotersModel from "../Schema/votersSchema";
import { ExpressTypes, Messages } from "../Typing";
import { GLOBAL_SOCKET } from "../CustomFunction/socket";
import { v4 as uuidv4 } from "uuid";
import { sendMessagesForVoted } from "../CustomFunction/sendEmail";
import Activity from "../Schema/activity";
import SampleRegisteredVoters from "../Schema/sampleRegisteredVoters";
export default async function voting(
  _: any,
  voted: any,
  { req }: ExpressTypes
): Promise<Messages> {
  const votingProcess = async (): Promise<Messages> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const {mayor ,vicemayor , msp} = voted
          const receiptNumber: string = uuidv4();
          const voteList = [
            {
              receiptNumber,
              timeAttempt: new Date().toLocaleString(),
              ...voted,
            },
          ];
          await VotersModel.findOneAndUpdate(
            { _id: req.userId },
            { voteList ,voted: true },
            { new: true }
          );
          await Candidates.findOneAndUpdate(
            { FullName: voteList[0].mayor[0] },
            {
              $push: {
                voterReceiptId: receiptNumber,
              },
            },
            { new: true }
          );
          await Candidates.findOneAndUpdate(
            { FullName: voteList[0].vicemayor[0] },
            {
              $push: {
                voterReceiptId: receiptNumber,
              },
            },
            { new: true }
          );
          voteList[0].msp.forEach(async (vote: any) => {
            await Candidates.findOneAndUpdate(
              { FullName: vote },
              {
                $push: {
                  voterReceiptId: receiptNumber,
                },
              },
              { new: true }
            );
          });

          const candidatesAndPositon = await Candidates.find({});
          voteList.forEach((vote: any) => {
            vote.msp.forEach((mspVotes: string) => {
              candidatesAndPositon.forEach(async (candidates: any) => {
                if (
                  candidates.FullName === vote.mayor[0] ||
                  candidates.FullName === vote.vicemayor[0] ||
                  candidates.FullName === mspVotes
                ) {
            
                  await Candidates.findOneAndUpdate(
                    { FullName: candidates.FullName },
                    { votes: candidates.votes + 1 },
                    { new: true }
                    );
                  }
                });
              });
            });
           
            const messaage = `
          <h3  style='color:#2196f3;'>Mayor</h3> 
           <strong  style='color: #263238;'>${mayor[0]} </strong>
           <h3 style='color:#2196f3;'>Vice Mayor</h3> 
            <strong style='color: #263238;'>${vicemayor[0]} </strong>
            <h3 style='color:#2196f3;'>MSP</h3> 
            <strong  style='color: #263238;'>${msp[0]} </strong><br>
            <strong  style='color: #263238;'>${msp[1]} </strong><br>
            <strong  style='color: #263238;'>${msp[2]} </strong><br>
            <strong  style='color: #263238;'>${msp[3]} </strong><br>
            <strong  style='color: #263238;'>${msp[4]} </strong><br>
            <strong  style='color: #263238;'>${msp[5]} </strong>
            `;
            await sendMessagesForVoted(req.userEmail , messaage)
            await sendNotif()
            await update();
            await SampleRegisteredVoters.findOneAndUpdate({userId:req.userId} ,{isVoted:true} ,{new:true}) 

          return resolve({
            success: true,
            message: "Successfully vote.",
          });
        } catch (err) {
          return reject({
            success: false,
            message: `Error to voted${err}`,
          });
        }
      }, 5000);
    });
  };

  return await votingProcess();
}

async function update(): Promise<void> {
  GLOBAL_SOCKET.broadcast.emit(
    "candidatesAndPosition",
    await Candidates.find({})
  );
}

async function sendNotif() {
  GLOBAL_SOCKET.on("vote-notify" ,async (messages:string)=>{
    const user = await VotersModel.findById(GLOBAL_SOCKET.handshake.auth.token)
    await new Activity({
        activityLog:messages,
        userID:GLOBAL_SOCKET.handshake.auth.token,
        isVoted:user.voted,
        isVerify:user.verify
      }).save()
    GLOBAL_SOCKET.broadcast.emit('server-recieve-message-connected',messages ,await Activity.find({}))
  })
}



