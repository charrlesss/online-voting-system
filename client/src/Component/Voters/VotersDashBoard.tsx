import React from 'react'
import { useMatch } from 'react-router-dom'
import { UserContext } from '../../CustomHooks/UserContext'
import userContext from '../../CustomHooks/UserContext'
import {Box} from '@material-ui/core'
import VotersHeader from './VotersHeader'
import 'react-toastify/dist/ReactToastify.css';
import { useFetchUserDetails } from '../../CustomAPI/API'
import useDetailsContext from '../../CustomHooks/useDetailsContext'
import VoterSideBar from './VoterSideBar'
import { ToastContainer, toast } from 'react-toastify';
import * as io  from 'socket.io-client'
import LoaderApi from '../LoaderApi'

const setItemLocalStorage = (name:string ,value:any):void=>{
  window.localStorage.setItem(name ,value)
}
const getItemLocalStorage:any = (name:string)=>{
  return window.localStorage.getItem(name)
}


const VotersDashBoard:React.FC<{children?:JSX.Element}> =({children}):JSX.Element=>{
  const [mySocket , setMySocket] = React.useState<any>(null)
  const getCurrentLocationPath = window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
  const {urlID ,fullname ,_id }:UserContext = React.useContext(userContext) 
  const matchFull = useMatch(`/s/:id/${getCurrentLocationPath}`)
  const matchId = useMatch(`/s/:id`)
  const {data , loading ,error} = useFetchUserDetails()
  const [sideBarAdjust , setSideAdjust] = React.useState<boolean>(Boolean(getItemLocalStorage('sideBar')))
  const [messages , setMessages] = React.useState<[]>([])

  React.useEffect(()=>{
    const firstRender:any = window.localStorage.getItem('Ref') || '1'
      window.localStorage.setItem('Ref',`${firstRender && firstRender + '1'}`)

      const socket = io.connect('/userAuthenticated',{
        reconnection:true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: 99999,
        auth:{token:_id}
      })
      setMySocket(socket)
      socket.on('connect' ,()=>{
      })
      
      if(firstRender.length < 2){
        toast.success(`Your connected`)
        socket.emit('message' ,`${fullname?.split(' ')[0]} is connected` ,async(data:any)=>{
            setMessages(data)
        })
      }
      
      socket.on('server-recieve-message-connected',(sm ,data)=>{
        toast.success(sm)
          setMessages(data)
      })
      socket.on('fetchMessages' ,(data)=>{
        setMessages(data)
      })
      
      
      socket.on('server-recieve-message',(sm ,data)=>{
        toast.success(sm)
        setMessages(data)
    })
    
    socket.on("connect_error", (err) => {
      toast.error(err.message)
    });

    socket.on("verify-messages" ,(sm)=>{
      toast.success(sm)
    })
  
    
  },[fullname ,setMySocket ,_id])
  




  const setAdjust =React.useCallback(()=>{
    if(getItemLocalStorage('sideBar')){
      setSideAdjust(false)
      return window.localStorage.removeItem('sideBar')
    }
    setSideAdjust(true)
    setItemLocalStorage('sideBar',!sideBarAdjust)
  },[sideBarAdjust])
  
  

  
  React.useEffect(()=>{
    if(matchId?.params.id !== urlID && !matchFull){
      window.location.href =`/s/${urlID}`
    }
  },[urlID ,matchFull, matchId])
  
  
  
  if(loading)return <LoaderApi />
  if(error)return <div>Loading</div>



  return (
    <useDetailsContext.Provider value={{...data.fetchBasicDetails[0] ,messages:messages ,socket:mySocket,sideBarAdjust}}>
    <ToastContainer
    autoClose={3000}
    />
    <Box
    style={{
      width:'100vw',
      height:'100vh',
      position:'relative',
      display:'flex',
      flexDirection:'row',
      columnGap:'12px'
    }}
    >
      <Box
      style={{
        height:'100%',
        width:sideBarAdjust ? '3%' :'15%',
        position:'relative',
        transition:'width 0.6s',
        display:'flex',
        justifyContent:'center',
      
      }}
      >
     <VoterSideBar sideBarAdjust={sideBarAdjust} setAdjust={setAdjust}/>
      </Box>
      <Box
      style={{
        width:sideBarAdjust ? '97%' :'85%',
        height:'100%',
        position:'relative',
        transition:'width 0.6s'
      }}
      >
      <VotersHeader />
      <Box
         style={{
          width:'100%',
          height:'93%',
          position:'relative',
          transition:'width 0.6s',
          boxShadow:'-1px 4px 5px 0px rgba(0,0,0,0.31)',
        }}
      >
          {children}
        
      </Box>
      </Box>

    </Box>
    </useDetailsContext.Provider>
  )
}

export default VotersDashBoard