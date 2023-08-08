import React from 'react'
import { Box } from '@mui/material'
import { useResendCode } from '../../CustomAPI/API'
import LoaderApi from '../LoaderApi'



const ResendCode:React.FC<{}> = ():JSX.Element =>{
    const {data ,loading ,error} = useResendCode()


    if (loading) return <LoaderApi />;
    if (error) return <div>Something Wrong</div>;
  
    console.log(data)


    return (
        <Box>
            {/* {data && data.resend.message} */}
        </Box>
    )
}

export default ResendCode