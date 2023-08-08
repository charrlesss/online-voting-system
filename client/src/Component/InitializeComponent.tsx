import React from 'react'
import MainRoutes from '../Routes/MainRoutes'
import { useFetchUserData } from '../CustomAPI/API'
import userContext from '../CustomHooks/UserContext'
import {Loader} from './OtherComponent/Loader'
const InitializeComponent:React.FC<{}> =():JSX.Element=>{
  const {data ,loading ,error } = useFetchUserData()


  if(loading) return <Loader/>
  if(error) return <div>error</div>

  return (
    <userContext.Provider value={data.user[0]}>
       <MainRoutes />
    </userContext.Provider>
  )
}

export default InitializeComponent