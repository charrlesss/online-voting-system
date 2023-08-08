import React from 'react'
import { useMatch } from 'react-router-dom'
import { UserContext } from '../../../CustomHooks/UserContext'
import userContext from '../../../CustomHooks/UserContext'
import Logout from '../../Logout'
import {Box} from '@material-ui/core'

const AdminDashboard:React.FC<{children?:JSX.Element}> =({children}):JSX.Element=>{
  const {urlID}:UserContext = React.useContext(userContext) 
  const match = useMatch('/s/:id')


 React.useEffect(()=>{
  if(match?.params.id !== urlID){
    window.location.href =`/s/${urlID}`
  }
 },[urlID , match])

 
  return (
    <Box>
        <Logout/>
        Admin
        {children}
    </Box>
  )
}

export default AdminDashboard