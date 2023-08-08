import React from "react";
import "../../../style/Overview.css";
import { Box } from "@mui/material";
import userContext, { UserContext } from "../../../CustomHooks/UserContext";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import useDetailsContext, {
  DetailsContext,
} from "../../../CustomHooks/useDetailsContext";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import GridViewIcon from "@mui/icons-material/GridView";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PeopleIcon from "@mui/icons-material/People";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { Doughnut,  Line  } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

interface CandidatesAndPosition {
  _id: string;
  FullName: string;
  position: string;
  votes: number;
}

interface VotersStatus {
  notVoted: number;
  verified: number;
  notverified: number;
  voted: number;
  voters: number;
  sampleRegisterVoter:number
}
const VotersOverview: React.FC = (): JSX.Element => {
  const { fullname }: UserContext = React.useContext(userContext);
  const { messages, socket }: DetailsContext =
    React.useContext(useDetailsContext);
  const [votersStatus, setVotersStatus] = React.useState<VotersStatus>({
    notVoted: 0,
    voted: 0,
    voters: 1,
    verified: 0,
    notverified: 0,
    sampleRegisterVoter:0
  });
  const [candidatesAndPosition, setCandidatesAndPosition] = React.useState<
    CandidatesAndPosition[]
  >([]);
  const [connectedUser, setConnectedUser] = React.useState<number>(0);
  React.useEffect(() => {
    socket.on("verifiedVoters", (data: any) => {
      setVotersStatus(data);
    });
    socket.on("candidatesAndPosition", (data: any) => {
      setCandidatesAndPosition(data);
    });
    socket.on("connectedUser", (data: number) => {
      setConnectedUser(data);
    });
  }, [socket]);

React.useEffect(()=>{
  const notificationBody = document.querySelector('#notification-container')
  if(notificationBody){
    notificationBody.scrollTop =  notificationBody.scrollHeight;
   } 
})


  return (
    <Box className="overview-container">
      <Box className="divider-container">
        <Box className="title-container">
          <Box className="title-title">
            <p className="Name">Overview</p>
            <Box className="title-child">
              <img
                style={{
                  position: "absolute",
                  width: "330px",
                  height: "280px",
                  right: "30%",
                  bottom: "-25%",
                }}
                src="../../vote-o-logo.png"
                alt="logo"
              />
              <p className="userName">Hi {fullname}!</p>
              <Box className="title-child-text">
                <p> Check How is carried out in your</p>
                <p> Organization</p>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="content-container">
          <Box className="con-1 box-1">
            <Box className="text-content">
              <p className="text-text-content-need">3</p>
              <p className="text-text-content">No. of Position</p>
            </Box>
            <Box className="icon-content">
              <PictureInPictureAltIcon
                style={{
                  width: 90,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-2">
            <Box className="text-content">
              <p className="text-text-content-need">
                {candidatesAndPosition.length}
              </p>
              <p className="text-text-content">No. of Candidates</p>
            </Box>
            <Box className="icon-content">
              <WorkspacePremiumIcon
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-3">
            <Box className="text-content">
              <p className="text-text-content-need">
                {Math.round(
                  (votersStatus.voted / votersStatus.sampleRegisterVoter) * 100
                ).toString() + "%"}
              </p>
              <p className="text-text-content">
                Participation ({votersStatus.voted} voted)
              </p>
            </Box>
            <Box className="icon-content">
              <GroupWorkIcon
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-4">
            <Box className="text-content">
              <p className="text-text-content-need">{votersStatus.sampleRegisterVoter}</p>
              <p className="text-text-content"> All registered to vote</p>
            </Box>
            <Box className="icon-content">
              <PeopleIcon
                style={{
                  width: 95,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-5">
            <Box className="text-content">
              <p className="text-text-content-need">{votersStatus.voters -1}</p>
              <p className="text-text-content">Accounts</p>
            </Box>
            <Box className="icon-content">
              <GppGoodIcon
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-6">
            <Box className="text-content">
              <p className="text-text-content-need">{connectedUser}</p>
              <p className="text-text-content">connected</p>
            </Box>
            <Box className="icon-content">
              <ConnectWithoutContactIcon
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-1 box-7">
            <Box className="text-content">
              <p className="text-text-content-need">{votersStatus.voted}</p>
              <p className="text-text-content"> Votes Tally</p>
            </Box>
            <Box className="icon-content">
              <GridViewIcon
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  opacity: ".3",
                }}
              />
            </Box>
          </Box>
          <Box className="con-m">
            <Box
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                paddingTop: "10px",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: ".3px",
                color: "indigo",
              }}
            >
              Mayor
            </Box>
            <Box
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Line 
                data={{
                  labels: candidatesName(candidatesAndPosition,'mayor'),
                  datasets: [
                    {
                      label: 'Mayor Vote Monitoring',
                      data: candidatesVoteHave(candidatesAndPosition,'mayor'),
                      borderWidth: 2,
                      backgroundColor:'#0077c2',
                      borderColor:'#80d6ff',
                      hoverBorderWidth:1,
                      pointBorderWidth:1
  
                    }
                  ],
                }}
                options={{
                  indexAxis: "y",
                  scales: {
                    x: {
                      min: 0,
                      max: votersStatus.sampleRegisterVoter,
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  animations: {
                    tension: {
                      duration: 1000,
                      easing: 'linear',
                      from: 1,
                      to: 0,
                      loop: true
                    }
                  }
                }}
              />
            </Box>
          </Box>
          <Box className="con-vc">
            <Box
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                paddingTop: "10px",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: ".3px",
                color: "indigo",
              }}
            >
              Vice Mayor
            </Box>
            <Box
              style={{
                position: "absolute",
                width: "350px",
                height: "350px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Doughnut
                data={{
                  labels: candidatesName(candidatesAndPosition ,'vicemayor'),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: candidatesVoteHave(candidatesAndPosition ,'vicemayor'),
                      backgroundColor: ["#18ffff", "#e040fb", "#00e676"],
                      borderColor: ["#18ffff", "#e040fb", "#00e676"],
                      borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  cutout:120
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="activity-container">
        <Box className="voted-content">
          <p className="caption">Current verify status</p>
          <Box className="voted-content-counter">
            <Box
              style={{
                width: "auto",
                height: "auto",
                display: "flex",
                alignItems: "end",
                fontFamily: "Arial , sans-serif",
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#00e676",
                  marginRight: "7px",
                }}
              >
                {votersStatus.voted}{" "}
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "28px",
                  marginRight: "7px",
                }}
              >
                {" "}
                Out of
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                {votersStatus.sampleRegisterVoter}{" "}
              </p>
            </Box>
            <Box
              style={{
                width: "auto",
                height: "auto",
                color: "white",
                fontSize: "14px",
                fontFamily: "Arial , sans-serif",
                opacity: 0.6,
              }}
            >
              <p>The voters verify</p>
            </Box>
          </Box>
        </Box>
        <Box
         
          style={{
            position: "relative",
            height: "70%",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          
          }}
        >
          <p
            style={{
              color: "#1a205e",
              fontSize: "12px",
              fontFamily: "sans-serif",
              fontWeight: "1000",
              margin: "5px",
            }}
          >
            voting activity
          </p>
          <Box 
           id='notification-container'
           className="activity-message-container"
           >
            {messages &&
              messages.map((data: any, idx: number) => {
                const date = data.date.split("T")[0];
                const time = data.date.split("T")[1].split(":")[0];

                return (
                  <Box key={idx} className="activity-message">
                    <Box className="activity-icon-container">
                      <CampaignOutlinedIcon style={{ width: 30, height: 30 }} />
                    </Box>
                    <Box className="activity-text-container">
                      <p className="activity">{data.activityLog}</p>
                      <p className="date">{`${date} ${time + ":00"}`}</p>
                    </Box>
                    <Box className="voted-text-container">
                      <p className="voted-text">
                        {data.isVerify ? "verify" : "not verify"}
                      </p>
                      <p className="voted-text">
                        {data.isVoted ? "voted" : "not voted"}
                      </p>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VotersOverview;

export function candidatesName(candidates: CandidatesAndPosition[] , position:string): string[] {
  const list = candidates.filter((data:any)=>{
    return data.position.trim() === position && !data.backout 
   })
  const arr: string[] = [];
  list.forEach((data: CandidatesAndPosition) => {
    arr.push(data.FullName);
  });
  return arr;
}

function candidatesVoteHave(candidates: CandidatesAndPosition[] ,position:string): number[] {
  const list = candidates.filter((data:any)=>{
   return data.position.trim() === position && !data.backout 
  })

  const arr: number[] = [];
  list.forEach((data: CandidatesAndPosition) => {
    arr.push(data.votes);
  });
  return arr;
}

