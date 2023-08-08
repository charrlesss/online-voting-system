import React from 'react'
import { Box } from '@mui/material'
import { useRemoveNotVerifyAccount } from '../../CustomAPI/API'
import LoaderApi from '../LoaderApi'


const RemoveNotVerifyAccount:React.FC<{}> = ():JSX.Element =>{
    const {data ,loading ,error} = useRemoveNotVerifyAccount()


    if (loading) return <LoaderApi/>;
    if (error) return <div>Something Wrong</div>;
  
    console.log(data)


    return (
        <Box style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center'
        }}>
              <h1>  Removing Your Account</h1>
                <h2>Loading......</h2>            
        </Box>
    )
}

export default RemoveNotVerifyAccount