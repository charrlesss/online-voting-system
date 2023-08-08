
import React from 'react'
import "../../style/Signin_Signup.css";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Checkbox, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import { FormControlLabel } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ReCAPTCHA from "react-google-recaptcha";
import { Box, Button, TextField } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';
import LoaderApi from '../LoaderApi';
 const useStyles = makeStyles({
    root: {
      color: "#b71c1c",
    },
    terms: {
      color: "#00838f"
    },
    title:{
      color:'#e0f7fa'
    }
  });



const validationSchema = yup.object({
email: yup.string().email().required().min(8),
password: yup.string().required().min(5),
});

interface FormProps{
  checkChange?:any
  mutate?:any
  loading?:boolean
  error?:boolean
  data?:any
  name?:any
}

const FormSignin:React.FC<FormProps>=({checkChange ,mutate , loading ,error, data ,name}):JSX.Element=> {

    const [captcha, setCaptcha] = React.useState<boolean>(false);
  
    const [passwordShow, setPasswordShow] = React.useState<boolean>(false);
    const [check, setCheckBox] = React.useState<boolean>(false);
 
    
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: (input) => {
          console.log(input)
          mutate({variables:input})
        formik.resetForm();
        setCheckBox(false);
        setCaptcha(false);
      },
    });
  
    const handlePassword = () => {
      setPasswordShow(!passwordShow);
    };
  
  
    const handleMouseDownPassword = (event:any) => {
      event.preventDefault();
    };
  
    const handleCheckBox = () => {
      setCheckBox(!check);
    };
  
    const onChange = () => {
      setCaptcha(!captcha);
    };
  
    const classes = useStyles();
  
    if(loading){
      return <LoaderApi />
    }
    if(error){
      return <div>error</div>
    }

  return (
      <Box style={{ width: "100%", height:'100vh', position: "relative" }}  >
        <Box
        style={{
          position:'absolute',
          bottom:data ?'15%' :'20%',
          right:'25%',
          width:'50%',
          height:'auto',
          display:'flex',
          columnGap:'10px'
      }}
      >
         <Button
          href='/signup'
          color='primary'
         >
           Don't have an account?
         </Button>
      <Button
      onClick={()=>checkChange('')}
        startIcon={<ArrowBackIcon/>}
      >
          Back
        </Button>
      </Box> 
       {name ==='Voters'  ? 
      <Box
        style={{
          position:'absolute',
          top:'8%',
          left:'10%',
          width:'auto',
          height:'auto'
      }}
      >
         <p
          style={{
            fontSize:'2em',
            fontFamily:"fantasy"
          }}
          > 
          <span 
          style={{
            color:'#FFA000'
          }}
          >
          Welcome Back &#160;
            </span>  
            {name} ,
          </p>

          <p
          style={{
            fontSize:'20px',
            fontFamily:"fantasy"
          }}
          > 
          Its nice to see you again!
          </p>
          <br/>
          <p
          style={{
            fontSize:'14px',
            fontFamily:"sans-serif",
            fontWeight:'300',
            letterSpacing:'.5px'
          }}
          > 
         Log in to continue to your account.
          </p>
          <br/>
        
      </Box> :
       <Box
        style={{
          position:'absolute',
          top:'8%',
          left:'10%',
          width:'auto',
          height:'auto'
      }}
      >
             <p
          style={{
            fontSize:'2em',
            fontFamily:"fantasy"
          }}
          > 
          <span 
          style={{
            color:'#FFA000',
            paddingBottom:'5px'
          }}
          >
          Welcome &#160;
            </span>  
            {name} ,
          </p>
          <p
          style={{
            fontSize:'14px',
            fontFamily:"sans-serif",
            fontWeight:'300',
            letterSpacing:'.5px'
          }}
          > 
         Log in to continue to your account.
          </p>
        </Box>
       }

     

      <Box className="form-form-container">
        <Box  className="title-form-container">
          <Box style={{
            position:'relative',
            width:'100px',
            height:'100px'
          }}>
          <img src="OVS_L.png" alt="for better"  style={{ width: "100px", height: "100px" ,position:"absolute" }}/>
          </Box>
          
          <Typography variant="h6" className={classes.title}>Sign-in</Typography>
        </Box>
        <br/>

       {data && 
        (   
        (data.votersignin &&  
         <>
              <Alert severity={data.votersignin.success ? 'success' : 'error'} >
                <AlertTitle>{data.votersignin.success ? 'Login Successful' : 'Error'}</AlertTitle>
                {data.votersignin.message + "."}
                </Alert>
              <br />
           </>
        )||
        (data.employeesignin &&  
          <>
               <Alert severity={data.employeesignin.success ? 'success' : 'error'} >
                 <AlertTitle>{data.employeesignin.success ? 'Login Successful' : 'Error'}</AlertTitle>
                 {data.employeesignin.message + "."}
                 </Alert>
               <br />
            </>
         )||
         (data.adminsignin &&  
          <>
               <Alert severity={data.adminsignin.success ? 'success' : 'error'} >
                 <AlertTitle>{data.adminsignin.success ? 'Login Successful' : 'Error'}</AlertTitle>
                 {data.adminsignin.message + "."}
                 </Alert>
               <br />
            </>
         )) 
        } 
        <Box >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Email"
              placeholder="email"
              variant="outlined"
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <AlternateEmailOutlinedIcon
                    sx={{ mr: 1 }}
                    fontSize="small"
                  />
                ),
              }}
            />
            <br />
            <br />
            <TextField
              label="Password"
              placeholder='password'
              variant="outlined"
              type={passwordShow ? "text" : "password"}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <VpnKeyOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {passwordShow ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChange}
            />
            <br />
            <Box
          style={{
            display:'flex',
            justifyContent:'left',
            paddingLeft:'10px'
          }}
          >
          <FormControlLabel
          control={
            <Checkbox
              checked={check}
              onChange={handleCheckBox}
              size="small"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          }
          label={
            <Typography variant="caption" className={classes.terms}>
              agree to terms and conditions.
            </Typography>
          }
        />
          </Box>
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: "100%",
              }}
              disabled={check && captcha ? false : true}
            >
              Sign up
            </Button>
          </form>
        </Box>
      </Box> 
    </Box>
  
  )
}

export default FormSignin


