import React from 'react'
// import logo from "../../../public/logo.png";
import { Box, Typography } from "@material-ui/core";


interface PageNotFoundProps{
    name:string
    redirect:string
}

const PageNotFound:React.FC<PageNotFoundProps>=({name ='',redirect = '/'}):JSX.Element=> {
    return (
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:"#f8f8f8",
          fontFamily: 'Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif'
        }}
      >
        <Box
          style={{
            textAlign: "center",
          }}
        >
          <img
            style={{
              width: "400px",
              height: "400px",
              borderRadius:'50%',
              position:'absolute',
              top:'50%',
              left:'50%',
              transform:'translate(-50%,-90%)'
            }}
            src='../../OVS_L.png'
            alt="online voting system logo"
          />
          <Typography variant="h4">This page isn't available</Typography>
          <br />
          <Typography variant="h6">
            The link you followed may be broken, or the page may have been
            removed.
          </Typography>
          <br />
          <br />
          <a
            style={{
              backgroundColor: " #0A7CFF",
              color: "white",
              padding: "14.5px 30px",
              fontSize: " 15px",
              lineHeight: " 20px",
              fontWeight: '400',
              textDecoration: "none",
              borderRadius: "50px",
              margin: "10px",
            }}
            href={`${redirect}`}
          >
            Go back to {name}
          </a>
        </Box>
      </Box>
    );
  }
  


  export default PageNotFound