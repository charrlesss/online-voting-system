import React from 'react'
import { Box } from '@material-ui/core'
import {useLogout} from '../CustomAPI/API'
import userContext ,{UserContext} from '../CustomHooks/UserContext'
import useDetailsContext ,{DetailsContext} from '../CustomHooks/useDetailsContext'
import LogoutIcon from '@mui/icons-material/Logout';
const Logout:React.FC<{sideBarAdjust?:boolean}>=({sideBarAdjust}):JSX.Element=>{
    const {_id,fullname}:UserContext = React.useContext(userContext)
    const {logout,loading ,error} = useLogout()
    const {socket}:DetailsContext = React.useContext(useDetailsContext)

  
    const Logout = ()=>{
        socket.emit('disconnectUser' ,{userId:_id ,fullname:fullname?.split(' ')[0]})
        logout()
       
    }   

    return (
        <Box
         className={`sidebar-conainer`}
            onClick={Logout}
        >

            <Box
                className={`sidebar-conainer-for-icon  logout ${ !sideBarAdjust ? 'animateNameShow' : 'animateNameHide' }`}

              >
              <LogoutIcon style={{color:"white"}}/>
              </Box>
            {!sideBarAdjust &&  <Box
              className={`sidebar-conainer-for-name `}
              >
                
            {loading ? 'Loading' :error ? `${error}` : 'LOG-OUT'}
              </Box>}
        </Box>
    )
}

export default Logout