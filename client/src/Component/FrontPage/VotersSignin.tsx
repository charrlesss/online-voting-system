import React from 'react'
import { useSigninVoterAccount } from '../../CustomAPI/API'
import FormSignin from './FormSignin'


interface FormProps{
    checkChange?:any
  }


const VotersSignin:React.FC<FormProps> =({checkChange}):JSX.Element=> {
    const {mutate , loading ,data,error} = useSigninVoterAccount()
  return (
     <FormSignin 
     checkChange={checkChange}
     mutate={mutate} 
     loading={loading} 
     data={data}
      error={error}
      name={'Voters'}
      />
  
  )
}



export default VotersSignin