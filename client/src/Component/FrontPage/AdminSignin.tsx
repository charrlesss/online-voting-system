import React from 'react'
import { useSigninAdminAccount } from '../../CustomAPI/API'
import FormSignin from './FormSignin'


interface FormProps{
    checkChange?:any
  }
  

const AdminSignin:React.FC<FormProps> =({checkChange}):JSX.Element=> {
    const {mutate , loading ,data,error} = useSigninAdminAccount()
  return (
    <FormSignin
      checkChange={checkChange}
     mutate={mutate}
      loading={loading} 
      data={data} 
      error={error}
      name={'Admin'}
      />

  )
}



export default AdminSignin