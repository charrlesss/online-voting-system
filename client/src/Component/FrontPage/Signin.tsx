import React from 'react'
import "../../style/Signin_Signup.css";
import HeaderBar from '../FrontPage/HeaderBar'
import { Box ,Button ,makeStyles} from "@material-ui/core";
import AdminSignin from './AdminSignin'
import VotersSignin from './VotersSignin'
import EmployeeSignin from './EmployeeSignin'

const useStyles = makeStyles({
  button1: {
    backgroundColor: '#2196F3',
    color: '#fff',
    boxShadow:'0px  0px 3px .3px #2196F3',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
      boxShadow:'0px 2px 10px 1px grey',
    }
  },
  button2: {
    backgroundColor: '#E040FB',
    color: '#fff',
    boxShadow:'0px  0px 3px .3px #E040FB',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
      boxShadow:'0px 3px 7px .3px grey',
  }
},
button3: {
  backgroundColor: '#18FFFF',
  color: '#3F51B5',
  boxShadow:'0px  0px 3px .3px #18FFFF',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#3c52b2',
    boxShadow:'0px 2px 10px 1px grey',
  }
}

})


const SigninContent:React.FC = ():JSX.Element =>{
  const innerHeight = window.innerHeight

    return (
        <Box
          style={{
            width: "100%",
            height: `${innerHeight-1}px`,
            position: "relative",
            display: "flex"
          }}
        >
       <Box className="about-form">
            <Box className="formBg-container"></Box>
            <Box className='text' >
              <p>
              The process of this system is ambiguous in that voters need to
              register and continually check if their details are in the system and
              voters need to vote on ballots on Election Day. To register to vote,
              the voter is added to a list of eligible voters, as with any election.
              They then receive authentication information, such as a username and
              password, to access the voting system. Voters can vote by opening the
              election website from an Internet browser, identifying themselves
              (e.g. with their username and password) and choosing their voting
              options
              </p>
            </Box>
          </Box> 
        </Box>
      );
}



const SigninUser:React.FC<{checkChange:any}> = ({checkChange}):JSX.Element =>{
  const innerHeight = window.innerHeight
  const classes = useStyles()
    

    return (
        <Box
          style={{
            width: "100%",
            height: `${innerHeight-1}px`,
            position: "relative",
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
       <Box
        style={{
          width: "500px",
          height: `220px`,
          position: "relative",
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-around',
        }}
       >
       
         <Button
          variant='contained'
          color='secondary'
          className={classes.button1}
          style={{
            height:'45px'
          }}
          onClick={()=>checkChange('voter')}
         >
           Voter
         </Button>

         <Button
          variant='contained'
          color='primary'
          className={classes.button2}
          style={{
            height:'45px'
          }}
          onClick={()=>checkChange('employee')}
         >
           Employee
         </Button>

         <Button
          className={classes.button3}
          variant='contained'
          style={{
            height:'45px'
          }}
          onClick={()=>checkChange('admin')}
         >
           Admin
         </Button>
        </Box>
        </Box>
      );
}


const Signin:React.FC<{}>=():JSX.Element=>{
    const innerHeight = window.innerHeight
    const [isClick ,setIsClick] = React.useState<boolean>(false)
    const [whereTogo ,setWhereTogo] = React.useState<string>('')

    const checkChange=React.useCallback((where:string)=>{
      setIsClick(click =>!click)
      setWhereTogo(where)
    },[])
 
    return (
        <div style={{
            position:'relative',
            width:'100%',
            height:`${innerHeight}px`,
           
        }}>
            <HeaderBar
             option={{ background:'white'}}
             listOption ={{color:'#1a237e'}}
             readShadow={true}
            />
            <Box
              style={{
                display:'flex',
                transition:'1s'
              }}
            >
            <SigninContent />
            <Box
            style={{
              width:isClick ? '50%' : '100%',
              position:'relative',
              height:`${innerHeight}`,
              transition:'0.8s'
            }}
            >
     
          {isClick && whereTogo?
           (whereTogo === 'voter' && <VotersSignin checkChange ={checkChange}/>)||
          ( whereTogo === 'employee' &&  <EmployeeSignin  checkChange ={checkChange} />)||
          ( whereTogo === 'admin' &&  <AdminSignin  checkChange ={checkChange} />)
          :
            <SigninUser checkChange={checkChange} />
            }
            </Box>
          

            </Box>
            
        </div>

    )
}
export default Signin