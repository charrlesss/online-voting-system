import React from "react";
import { Button  ,Box } from "@material-ui/core";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import '../../style/FormVerify.css'
import { useVerifyVoters } from "../../CustomAPI/API";
import useCountDown from "../../CustomHooks/useCountDown";
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import LoaderApi from '../LoaderApi'

const ClientConfirmation:React.FC<{}> = ():JSX.Element => {
  const {counter ,disable   } = useCountDown()

  const {mutate ,data ,error ,loading} = useVerifyVoters()
  const [resendTime ,setResendTimes] = React.useState<string>(window.localStorage.getItem('resendTimes') || '')
  const [show, setShow] = React.useState<boolean>(false);
  const [errors , setErrors] = React.useState<{message:string}>({message:''})


  
  
  React.useEffect(() => {

    if(window.localStorage.getItem('disable')){
    window.localStorage.removeItem('disable')
    }  
   
  }, []);


  React.useEffect(() => {

 
    if(data){
      setErrors({message:data.verifyVoters.message})
    }
  }, [data]);


  React.useEffect(() => {
    if(parseInt(resendTime) >  3){
      window.location.href = '/removeVerify'
    }
  }, [resendTime]);
  

  React.useEffect(() => {
      

    const element:(HTMLElement | null) = document.querySelector("#first");
    element && element.focus()
  }, []);


  const handleFocus = (e:any) => {
    e.target.value = "";
  };
  const handleKeyDown = (e:any, next:string) => {
    if (e.target.value.length) {
       const element:(HTMLElement | null) =  document.querySelector(`#${next}`)
       element && element.focus()
        
    }
  };

  const handleSubmit = React.useCallback(
    (e:any) => {
      e.preventDefault();
      const handleCode:any = [];
      document.getElementsByName("code").forEach((el:any) => {
        handleCode.push(el.value);
      });

      if (handleCode.includes("")) {
        return setErrors({ message: "Required field!" });
      }
      setErrors({message:''});
        mutate({
          variables: {
            code: handleCode.join(""),
          },
        });
    },[mutate]);

  if (loading) return <LoaderApi/>;
  if (error) return <div>Something Wrong</div>;
  
  return (
    <div className="formContainerForVerify">
      <div className="text-container">
        <p className="title">Verify your @ccount </p>
        <div className="child-text-container">
           <p className="countingVerify">{counter} second</p> 
           <p className="countingVerify">Attempt:{resendTime}/3</p> 
         
          <p>  <SendIcon /> Enter the code we sent to your @gmail</p>
          <br/>
          <p>
          Warning reminds you that the system detect your resend the code 3 times it will automatically disable your verification
         </p>
        </div>
      </div>
      <br />

      {errors.message !== '' && (
            <>
                <Alert severity={data.verifyVoters.success ? 'success' : 'error'} >
                <AlertTitle>{data.verifyVoters.success ? 'Verify Successful' : 'Error'}</AlertTitle>
                {errors.message + "."}
                </Alert>
              <br />
            </>
          )} 
      <Grid
        container
        justifyContent="center"
        textAlign="center"
        direction="column"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="codeVerify">
            <input
              type={show ? "text" : "password"}
              name="code"
              id="first"
              maxLength={1}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, "second")}
            />
            <input
              type={show ? "text" : "password"}
              name="code"
              id="second"
              maxLength={1}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, "third")}
            />
            <input
              type={show ? "text" : "password"}
              name="code"
              id="third"
              maxLength={1}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, "fourth")}
            />
            <input
              type={show ? "text" : "password"}
              name="code"
              id="fourth"
              maxLength={1}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, "fifth")}
            />
            <input
              type={show ? "text" : "password"}
              name="code"
              id="fifth"
              maxLength={1}
              onFocus={handleFocus}
            />
          </div>

           {Boolean(disable) && (
            <div className="resend">
              <br />
              <Button 
              type="button" 
              variant="contained" 
              color="secondary"
              onClick={():void=>{
                  const counting:string = window.localStorage.getItem('resendTimes') || ''
                  setResendTimes(counting)
                 
                 window.localStorage.setItem('resendTimes',counting ? `${parseInt(counting) + 1}` : '1') 
                 window.localStorage.setItem('disable','')
                 window.localStorage.setItem('timerStart','30')
                 window.localStorage.setItem('timeend','30')
                 window.location.href ='/resend'
                
              }}>
                Resend
              </Button>
            </div>
          )} 

          <br />
          <br />
          <Box style={{padding:'0 20px'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
               disabled={Boolean(disable)}
            >
              Verify
            </Button>
          </Box>
        </form>
      </Grid>
      <button type="button" className="button" onClick={() => setShow(!show)}>
        {show ? (
          <>
            <span>hide</span>
            <VisibilityOffIcon />
          </>
        ) : (
          <>
            <span>show</span> <VisibilityIcon />
          </>
        )}
      </button>
    </div>
  );
};

export default ClientConfirmation;
