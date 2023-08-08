import React from 'react'
import { useSigninEmployeeAccount } from '../../CustomAPI/API'
import FormSignin from './FormSignin'


interface FormProps{
    checkChange?:any
  }


const EmployeeSignin:React.FC<FormProps> =({checkChange}):JSX.Element=> {
    const {mutate , loading ,data,error} = useSigninEmployeeAccount()
    
  return (
    <FormSignin
    checkChange={checkChange}
     mutate={mutate}
      loading={loading} 
      data={data} 
      error={error}
      name={'Employee'}
      />
   
  )
}



export default EmployeeSignin