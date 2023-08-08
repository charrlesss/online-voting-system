import React  from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import "../../style/DotsLoader.css";
import { useAuthenticated } from "../../CustomAPI/API";

const useStyle = makeStyles({
  root: {
    color: "#9880ff",
  },
  title: {
    color: "#1a237e",
  },
});
const UserAuthenticated: React.FC = (): JSX.Element => {
const [isRedirecting , setIsRedirecting] = React.useState(false)
const {data ,loading ,error} =useAuthenticated()
    
  const classess = useStyle();
    
  React.useEffect(()=>{
      if(isRedirecting && data){
        window.location.href ='/'
    }
  },[isRedirecting ,data])

  React.useEffect(()=>{
    if(loading) return
    const clearMyTimeout = setTimeout(()=>{
        setIsRedirecting(true)
    },3000)
   
    if(isRedirecting){
        return ()=>clearTimeout(clearMyTimeout)
    }
  },[loading ,isRedirecting])


 
  
  if(loading) return (
    <Box
    style={{
      width: "100%",
      height: "98vh",
    }}
  >
    <Box
      style={{
        width: "auto",
        height: "auto",
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50% ,-50%)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" className={classess.title}>
        Automatically Login
      </Typography>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-end",
          textAlign: "center",
          justifyContent: "center",
          columnGap: "20px",
        }}
      >
        <Box
          style={{
            position: "relative",
            bottom: "-5px",
          }}
        >
          <Typography variant="h6" className={classess.root}>
            waiting for a progress
          </Typography>
        </Box>

        <div className="snippet" data-title=".dot-pulse">
          <div className="stage">
            <div className="dot-pulse"></div>
          </div>
        </div>

        <br />
      </Box>

      <br />
      <CircularProgress
        color="inherit"
        size={"5em"}
        thickness={2.3}
        style={{ color: "#e8eaf6" }}
      />
    </Box>
  </Box>

  )
  if(error) return <div>error</div>


  return (
    <Box
      style={{
        width: "100%",
        height: "98vh",
      }}
    >
      <Box
        style={{
          width: "auto",
          height: "auto",
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50% ,-50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className={classess.title}>
          Automatically Login
        </Typography>
        <Box
          style={{
            display: "flex",
            alignItems: "flex-end",
            textAlign: "center",
            justifyContent: "center",
            columnGap: "20px",
          }}
        >
          <Box
            style={{
              position: "relative",
              bottom: "-5px",
            }}
          >
            <Typography variant="h6" className={classess.root}>
              waiting for a progress
            </Typography>
          </Box>

          <div className="snippet" data-title=".dot-pulse">
            <div className="stage">
              <div className="dot-pulse"></div>
            </div>
          </div>

          <br />
        </Box>

        <br />
        <CircularProgress
          color="inherit"
          size={"5em"}
          thickness={2.3}
          style={{ color: "#e8eaf6" }}
        />
      </Box>
    </Box>
  );
};
export default UserAuthenticated;
