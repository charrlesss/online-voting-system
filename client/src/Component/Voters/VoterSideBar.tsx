import React from 'react'
import '../../style/SideBar.css'
import {Box} from '@material-ui/core'
import {IconButton  } from '@mui/material'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import userContext, { UserContext } from '../../CustomHooks/UserContext';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Logout from '../Logout';


const VoterSideBar:React.FC<{setAdjust:any ,sideBarAdjust:boolean}> =({sideBarAdjust ,setAdjust}):JSX.Element=>{
  const {urlID}:UserContext = React.useContext(userContext) 
  const voterSideBarData: {Name:string ,Icon:React.ReactElement , Link:string}[] = [
    {
      Name:'OVERVIEW',
      Icon:<DashboardCustomizeOutlinedIcon style={{color:'white'}}/>,
      Link:`/s/${urlID}`
     },
    {
        Name:'VERIFY ACCOUNT',
        Icon:<VerifiedUserOutlinedIcon style={{color:'white'}}/>,
        Link:`/s/${urlID}/verify`
    },
    {
      Name:'VOTE',
      Icon:<HowToVoteOutlinedIcon style={{color:'white'}}/>,
      Link:`/s/${urlID}/vote`
    },
    {
      Name:'CANDIDATES & POSITION',
      Icon:<GroupsOutlinedIcon style={{color:'white'}}/>,
      Link:`/s/${urlID}/candidites`
    },
    {
      Name:'RESULT',
      Icon:<SummarizeOutlinedIcon style={{color:'white'}}/>,
      Link:`/s/${urlID}/result`
    },
    {
      Name:'ABOUT',
      Icon:<PersonOutlineIcon style={{color:'white'}}/>,
      Link:`/s/${urlID}/about`
    }
]

  return (
      <Box
      style={{
        position:'relative',
        height:'auto',
        width:'100%',
        boxShadow:'3px 1px 5px 0px rgba(0,0,0,0.31)',
        background:'#263238',
      }}
      >
        <Box style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:'0 5px',
          columnGap:'5px',
          height:'60px',
          boxShadow:'1px 4px 5px 0px rgba(0,0,0,0.31)',
          backgroundColor:'#E3F2FD',
          marginBottom:"5px"
        }}>
          <Box
          style={{
            flex:sideBarAdjust ? '0%' :'75%',
            textAlign:'center',
            border:sideBarAdjust ?'':'1.3px solid #0091ea',
            borderRadius:'20px',
          }}
          >
          <p
          style={{
            color:'#0091ea',
            fontFamily:'Arial, Helvetica, sans-serif',
            fontSize:'14px',
            padding:'7px 2px '
          }}>
         {!sideBarAdjust && 'Barangay Online Voting'.toLocaleUpperCase()}
          </p>
          </Box>
          <Box
             style={{
              flex:'25%',
              display:'flex',
              alignContent:'center',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
          <IconButton
          color="secondary"
          component="span"
          onClick={setAdjust}
            >
          {sideBarAdjust ?<MenuOutlinedIcon/> : <MenuOpenOutlinedIcon /> }
        </IconButton>
          </Box>
         
        </Box>

        {!sideBarAdjust &&
         <Box 
        style={{
          width:'100%',
          height:'180px',
          position:'relative',
        }}>
             <img src="../../elections3.jpeg" alt="for better" className='image'  />
              <img src="../../election2.jpg" alt="for better" className='image'/>
              <img src="../../election1.jpg" alt="for better" className='image'/>
              <img src="../../election4.jpg" alt="for better" className='image'/>
        </Box>
         }
        {voterSideBarData.map((data ,idx)=>{
         
             return (
              <Box
               key={idx}
                onClick={()=>window.location.href = data.Link}
                className={`sidebar-conainer  ${window.location.pathname === data.Link ? "active" : ""}`}
              >
              <Box
               className={`sidebar-conainer-for-icon  ${data.Name} ${ !sideBarAdjust ? 'animateNameShow' : 'animateNameHide' }`}
              >
                {data.Icon}
              </Box>
              <Box
              className={`sidebar-conainer-for-name ${ !sideBarAdjust ? 'animateNameShow' : 'animateNameHide' }`}
              >
                {data.Name}
              </Box>
              
             </Box>
             )
            })
          }
      <Logout sideBarAdjust={sideBarAdjust}/>
      </Box>
  )
}

export default VoterSideBar