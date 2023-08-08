import React from "react";
import "../../style/Signin_Signup.css";
import * as yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField } from "@material-ui/core";
import { Checkbox, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useFormik } from "formik";
import { FormControlLabel } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ReCAPTCHA from "react-google-recaptcha";
import HeaderBar from "../FrontPage/HeaderBar";
import { useSignupUser } from "../../CustomAPI/API";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import WcIcon from '@mui/icons-material/Wc';
import LoaderApi from '../LoaderApi'
interface PasswordType {
  password?: boolean;
  confirmPassword?: boolean;
}

const useStyles = makeStyles({
  root: {
    color: "#b71c1c",
  },
  terms: {
    color: "#00838f",
  },
  title: {
    color: "#e0f7fa",
  },
});

const validationSchema = yup.object({
  fullname: yup.string().trim().required().min(5),
  email: yup.string().trim().email().required().min(8),
  gender:yup.string().trim().required(),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup.string().required().min(5),
});


const genderSelection:{value:string}[] = [
  {
    value: 'Male',
  },
  {
    value: 'Female',
  }
 
];

const innerHeight = window.innerHeight;

const FormSignup: React.FC = (): JSX.Element => {
 
  const classes = useStyles();
  const {mutate ,data, loading, error} = useSignupUser()
  const [captcha, setCaptcha] = React.useState<boolean>(false);
  const [passwordShow, setPasswordShow] = React.useState<PasswordType>({
    password: false,
    confirmPassword: false,
  });
  const [check, setCheckBox] = React.useState(false);
  
  
  const formik = useFormik({
    initialValues: {
      fullname: "",
      gender:"",
      email: "",
      confirmPassword: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (input) => {
      mutate({ variables:input });
      formik.resetForm();
      setCheckBox(false);
      setCaptcha(false);
    },
  });

  const handlePassword = () => {
    setPasswordShow({ password: !passwordShow.password });
  };
  const handleConfirmPassword = () => {
    setPasswordShow({ confirmPassword: !passwordShow.confirmPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleCheckBox = () => {
    setCheckBox(!check);
  };

  const onChange = () => {
    setCaptcha(!captcha);
  };


  if(loading) return <LoaderApi/>
  if(error) return <div>Loading</div>
  
 
  return (
    <Box
      className="formContainer"
      style={{
        width: "100%",
        height: `${innerHeight - 3}px`,
        position: "relative",
        display: "flex",
        borderTop: "1px solid #fff3e0",
      }}
    >
      <Box className="about-form">
        <Box className="formBg-container"></Box>
        <Box className="text">
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
      <Box style={{ width: "50%", height: "vh", position: "relative" }}>
        <Box className="form-form-container">
        <Box  className="title-form-container">
                <Box style={{
                  position:'relative',
                  width:'100px',
                  height:'100px'
                }}>
                <img src="OVS_L.png" alt="for better"  style={{ width: "100px", height: "100px" ,position:"absolute" }}/>
                </Box>
                
                <Typography variant="h4" className={classes.title}>Sign-up </Typography>
              </Box>
          <br />
          {data && (
              <>
                <Alert severity={data.createAccount.success ? 'success' : 'error'} >
                <AlertTitle>{data.createAccount.success ? 'Login Successful' : 'Error'}</AlertTitle>
                {data.createAccount.message + "."}
                </Alert>
              <br />
              </>
              )}  
             
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Full Name"
                placeholder="Full Name"
                variant="outlined"
                type="text"
                name="fullname"
                id="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
                InputProps={{
                  startAdornment: (
                    <AccountCircleOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                  ),
                }}
              />
              <br />
              <br />
              <TextField
                select
                label="Gender"
                placeholder="Gender"
                variant="outlined"
                type="text"
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.gender && Boolean(formik.errors.gender)
                }
                helperText={formik.touched.gender && formik.errors.gender}
                InputProps={{
                  startAdornment: (
                    <WcIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                  ),
                }}
              >
                 {genderSelection.map((option:{value:string}) => (
                    <MenuItem key={option.value} value={option.value} style={{
                      width:"100%",
                      height:"fit-content",
                      display:'flex',
                      justifyContent:"start",
                      paddingLeft:"10px"
                    }}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
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
                placeholder="password"
                variant="outlined"
                type={passwordShow.password ? "text" : "password"}
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
                        {passwordShow.password ? (
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
              <TextField
                label="Confirm Password"
                placeholder="confirm password"
                variant="outlined"
                type={passwordShow.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                InputProps={{
                  startAdornment: (
                    <VpnKeyOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {passwordShow.confirmPassword ? (
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
    </Box>
  );
};

const Signup: React.FC = (): JSX.Element => {
  const innerHeight = window.innerHeight;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${innerHeight}px`,
      }}
    >
      <HeaderBar
        option={{ background: "white" }}
        listOption={{ color: "#1a237e" }}
        readShadow={true}
      />
      <FormSignup />
    </div>
  );
};

export default Signup;
