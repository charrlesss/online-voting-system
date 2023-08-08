import React from 'react'
import { useMatch } from 'react-router-dom'
import { UserContext } from '../../CustomHooks/UserContext'
import userContext from '../../CustomHooks/UserContext'
import Logout from '../Logout'
import {Box} from '@material-ui/core'
import * as io  from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid'


const EmployeeDashboard:React.FC<{children?:JSX.Element}> =({children}):JSX.Element=>{
  const {urlID,_id ,fullname}:UserContext = React.useContext(userContext) 
  const match = useMatch('/s/:id')

  React.useEffect(()=>{
    const socket = io.connect('/userAuthenticated',{
      reconnection:true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 99999,
      auth:{token:_id}
    })
    socket.on('connect' ,()=>{
      console.log('asdasd')
      socket.emit('message' ,`${fullname} connected` ,window.localStorage.getItem('con'))
      
    })
    socket.on('server-recieve-message',(sm)=>{
      // toast.success(sm)
      console.log(sm)
    })
    socket.on("connect_error", (err) => {
      toast.error(err.message)
    });
    console.log(uuidv4())
    window.localStorage.setItem('con' ,`${uuidv4()}`)
    return ()=>{
      socket.disconnect()
    }
  },[fullname , _id])



 React.useEffect(()=>{
  if(match?.params.id !== urlID){
    window.location.href =`/s/${urlID}`
  }
 },[urlID , match])

 
  return (
    <Box>
      <ToastContainer/>
        <Logout/>
        Employee
        {children}
    </Box>
  )
}

export default EmployeeDashboard