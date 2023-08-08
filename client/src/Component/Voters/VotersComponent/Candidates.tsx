import { Box } from "@mui/material";
import React from "react";
import { useFetchCandidates } from "../../../CustomAPI/API";
import LoaderApi from "../../LoaderApi";
import "../../../style/Candidates.css";
const Candidates: React.FC = (): JSX.Element => {
  const { data, loading, error } = useFetchCandidates();

  if (loading) return <LoaderApi />;
  if (error) return <Box>error</Box>;
  console.log(backOut(data && data.fetchCandidates));
  return (
    <Box className="candidates-main-container">
      <Box className="candites-cotent">
      
      <Box className="one-container">
        <h1>Mayor</h1>
        {
          candidatesName(data && data.fetchCandidates ,'mayor').map((data:any ,idx:number)=>{
            return (
              <Box key={idx} className="mayor">
                <p>{idx+1}. {data}</p>
              </Box>
            )
          })
        }
      </Box>
      <Box className="two-container">
      <h1>Vice Mayor</h1>
        {
          candidatesName(data && data.fetchCandidates ,'vicemayor').map((data:any ,idx:number)=>{
            return (
              <Box key={idx} className="vice-mayor">
               <p>{idx+1}. {data}</p>
              </Box>
            )
          })
        }

      </Box>
      <Box className="three-container" >
      <h1>Member sanguniang panglungsod</h1>
        {
          candidatesName(data && data.fetchCandidates ,'msp').map((data:any ,idx:number)=>{
            return (
              <Box key={idx} className="msp">
                <p>{idx+1}. {data}</p>
              </Box>
            )
          })
        }
      </Box>
      <Box className="four-container" >
      <h1>ALL BACKOUT CANDIDATES.</h1>
        {
          backOut(data && data.fetchCandidates ).map((data:any ,idx:number)=>{
            return (
              <Box key={idx} >
                <p className="title">{idx+1}. {data.position}</p>
                <p className="name">{idx+1}. {data.FullName}</p>
              </Box>
            )
          })
        }
      </Box>
      </Box>
    </Box>
  );
};

export default Candidates;

interface CandidatesAndPosition {
  _id: string;
  FullName: string;
  position: string;
  votes: number;
  backout:boolean
}

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

export function backOut(candidates: CandidatesAndPosition[]): CandidatesAndPosition[] {
  const list = candidates.filter((data:any)=>{
    return data.backout 
   })
  const arr: CandidatesAndPosition[] = [];
  list.forEach((data: CandidatesAndPosition) => {
    arr.push(data);
  });
  return arr;
}
