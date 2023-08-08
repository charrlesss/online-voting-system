import React from 'react'
import { Box ,Button ,TextField } from '@material-ui/core'
import { useUploadFile } from '../../CustomAPI/API'
import LoaderApi from '../LoaderApi'

const UploadFile:React.FC<{filename:string | null ,isSubmiting:any,setFilename:any}> = ({filename,isSubmiting,setFilename})=> {
 
    const {mutate,data ,loading ,error} = useUploadFile()
    
    React.useEffect(()=>{
      if(data)
      setFilename(data.UploadFile.filename)
    },[data ,setFilename])

    function handleChange(e:any){
      e.preventDefault()
        const file = e.target.files[0]
        if(!file)return 
      

         mutate({variables:{file}})
    }

    if(loading)return <LoaderApi />
    if(error)return <div>Error</div>

  return (
    <Box
    style={{
      width: "50%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection:'column',
    }}
  >
    <img
      src={filename && data? `../container/${filename}` :data ?  `../container/${data.UploadFile.filename}`:filename ? `../container/${filename}` : '../userProfileDefault.jpg'}
      alt="sadasd"
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        marginBottom:'10px',
        boxShadow: '1px 3px 32px -12px #bdbdbd'
      }}
    />

    <Box
      style={{
        width: "auto",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
        <input type="file" id="file" onChange={handleChange} />
        <label htmlFor="file">choose file</label>
     

      <Button type="button" variant="contained" href="/capture">
        Take A Photo
      </Button>
     
    </Box>
    <br/>
    <TextField 
        fullWidth
        id="file"
        type='text'
        label={'File'}
          variant="outlined"
          disabled
          value={filename ? filename :data ? data.UploadFile.filename : filename?filename : 'photo'}
       
           error={filename ? false :data ? false : filename?false :isSubmiting ? true : false}
          helperText={filename ? false :data ? false : filename?false :isSubmiting ? 'file is required field!'  : ''}
      />
  </Box>
  )
}


export default UploadFile