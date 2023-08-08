import React from "react";
import { TextField, Box, Button ,makeStyles} from "@material-ui/core";
import "../../style/FormDetails.css";
import * as yup from "yup";
import { useFormik } from "formik";
import UploadFile from "./UploadFile";
import {  Typography } from "@mui/material";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useBasisDeatails } from "../../CustomAPI/API";
import LoaderApi from '../LoaderApi'

const validationSchema = yup.object({
  birthdate:yup.date().required('Birthdate is required'),
  municipality:yup.string().required(),
  zipcode:yup.string().required(),
  address:yup.string().required()
});

const useStyles = makeStyles({
  root:{
    color:'#90caf9'
  }
})


const FormDetails:React.FC = ():JSX.Element=> {
  const classes = useStyles()
  const {mutate ,data  ,loading ,error} = useBasisDeatails()
  const [submiting ,setSubmiting]= React.useState<any>(window.localStorage.getItem('submit') || false)
    const [filename , setFilename] = React.useState(window.sessionStorage.getItem('file') || null)
   
  const updateFilename = React.useCallback((data:any)=>{
    setFilename(data)
  },[])


    const formik = useFormik({
      initialValues: {
        birthdate:"",
        municipality: "",
        zipcode: '',
        address: ""
      },
      validationSchema: validationSchema,
      onSubmit: (input) => {
    
        if(filename){
          mutate({
            variables:{...input ,zipcode:input.zipcode.toString(),profile:filename}
          })
        }

        if( window.localStorage.getItem('submit')){
          return
        }
        formik.resetForm()
     
       
      },
    });

    
    if(loading)return <LoaderApi />
    if(error)return <div>Error</div>

    console.log(data)
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          width: "700px ",
          height: "auto",
          boxShadow: '1px 4px 9px -3px rgba(0,0,0,0.75)',
           background:'white'
        }}
      >
        <Box style={{
          position:'relative',
          width:'100%',
          height:'auto',
          padding:'25px'
        }}>
           <Typography variant='caption'>
            Welcome to
          </Typography>
          <Typography variant='h5' className={classes.root}>
            Online Voting System
          </Typography>
          <br/>
          <Typography variant='caption'>
          Complete the details to create your account and contribute to the online voting system.
          </Typography>
        </Box>
        {
          data && (
            <>
            <Alert severity={data.basicDetails.success ? 'success' : 'error'} >
            <AlertTitle>{data.basicDetails.success ? 'Successfully' : 'Error'}</AlertTitle>
            {data.basicDetails.message + "."}
            </Alert>
          <br />
        </>
          )
        }
      <form onSubmit={formik.handleSubmit} name="myForm" style={{ 
           padding:'20px 20px',
           display:'flex',
           gap:'20px'
          }}>
       <UploadFile filename={filename} isSubmiting={submiting} setFilename={updateFilename}/>
     
        <br />
        <Box
        style={{
          width:'50%'
        }}
        >
      
          <Box 
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:'column'
            }}
          >
            
             <TextField 
             fullWidth
             variant="outlined"
             type='date' 
             id='birthdate'
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              error={
                formik.touched.birthdate && Boolean(formik.errors.birthdate)
              }
              helperText={formik.touched.birthdate && formik.errors.birthdate}
            />

            <br />
            <TextField 
            id="municipality"
            fullWidth
            type='text'
            label='Municipality'
            variant="outlined"
            value={formik.values.municipality}
            onChange={formik.handleChange}
            error={
              formik.touched.municipality && Boolean(formik.errors.municipality)
            }
            helperText={formik.touched.municipality && formik.errors.municipality}
             />
            <br />
            <TextField 
            fullWidth
            id='zipcode'
            type='number'
            label='Zip Code'
             variant="outlined"
             value={formik.values.zipcode}
             onChange={formik.handleChange}
             error={
               formik.touched.zipcode && Boolean(formik.errors.zipcode)
             }
             helperText={formik.touched.zipcode && formik.errors.zipcode}
             />
            <br />
          
            <TextField
            
                  label="Current Address"
                  multiline
                  fullWidth={true}
                  id="address"
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}

                />
                <br/>
                <Button type="submit" variant="contained" color='primary' fullWidth onClick={()=>{
                    window.localStorage.setItem('submit','true')
                    setSubmiting(window.localStorage.getItem('submit'))
                }}>
                  Submit
                </Button>
          </Box>
        
        </Box>
        </form>
      </Box>
    </Box>
  );
}


export default  FormDetails