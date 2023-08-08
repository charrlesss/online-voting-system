import React from "react";
import { Button  ,Box, Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useVerifySecret } from "../../CustomAPI/API";
import '../../style/FormVerify.css'
import LoaderApi from '../LoaderApi'

const VerifySecret:React.FC<{}> = ():JSX.Element => {
  const {mutate ,data ,error ,loading} = useVerifySecret()
  const [show, setShow] = React.useState<boolean>(false);
  const [errors , setErrors] = React.useState<{message:string}>({message:''})


  React.useEffect(() => {
    if(data){
      setErrors({message:data.verifySecret.message})
    }
  }, [data]);





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

  if (loading) return <LoaderApi />;
  if (error) return <div>Something Wrong</div>;
    
  console.log(data)
  return (
    <div
    style={{
        width:'100vw',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}
     >
    
    
      <Box
        style={{
            boxShadow:'0 1px 4px 0 black',
            width:'auto',
            height:'auto',
            padding:'20px'
        }}
      >
          <Typography variant='h6'>Enter Your ID Number</Typography >
            <br/>
            {errors.message !== '' && (
            <>
                <Alert severity={data.verifySecret.success ? 'success' : 'error'} >
                <AlertTitle>{data.verifySecret.success ? 'Verify Successful' : 'Error'}</AlertTitle>
                {errors.message + "."}
                </Alert>
              <br />
            </>
          )} 
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
              onKeyDown={(e) => handleKeyDown(e, "sixth")}
            />
             <input
              type={show ? "text" : "password"}
              name="code"
              id="sixth"
              maxLength={1}
              onFocus={handleFocus}
              onKeyDown={(e) => handleKeyDown(e, "seventh")}
            />
             <input
              type={show ? "text" : "password"}
              name="code"
              id="seventh"
              maxLength={1}
              onFocus={handleFocus}
            />
          </div>
          <br />
          <Box
          style={{
            width:'auto',
            height:'auto',
            position:'relative',
            display:'flex',
            justifyContent:'flex-end'
        }}
        >
        <button 
        style={{
          border:'none',
          display:'flex',
          alignItems:'center',
          columnGap:'5px',
          padding:'5px',
          borderRadius:'15px',
          background:'white',
          cursor:'pointer'
        }}  
        type="button"
        onClick={() => setShow(!show)}>
        {show ? (
          <>
            <span>Hide</span>
            <VisibilityOffIcon />
          </>
        ) : (
          <>
            <span>Show</span> <VisibilityIcon />
          </>
        )}
      </button>
        </Box>
          <br />
          <Box style={{padding:'0 20px'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Verify
            </Button>
          </Box>
        </form>
      </Box>
    
    </div>
  );
};

export default VerifySecret;
