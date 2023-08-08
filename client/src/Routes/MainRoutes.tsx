import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import HomePage from '../Component/FrontPage/HomePage'
import Signup from '../Component/FrontPage/Signup'
import Signin from '../Component/FrontPage/Signin'
import ContactPage from '../Component/FrontPage/ContactPage'
import userContext from '../CustomHooks/UserContext'
import {UserContext} from '../CustomHooks/UserContext'
import VirifyClient from '../Component/OtherComponent/VerifyClient'
import ResendCode from '../Component/OtherComponent/ResendCode'
import RemoveNotVerifyAccount from '../Component/OtherComponent/RemoveNotVerifyAccount'
import CaptureUser from '../Component/OtherComponent/CapturedUser'
import FormDetails from '../Component/OtherComponent/FormDetails'
import UserAuthenticated from '../Component/OtherComponent/UserAuthenticated'
import PageNotFound from '../Component/OtherComponent/PageNotFound'
import VerifySecret from '../Component/OtherComponent/VerifySecret'
import VotersDashBoard from '../Component/Voters/VotersDashBoard'
import EmployeeDashboard from '../Component/Employee/EmployeeDashboard'
import AdminDashboard from '../Component/FrontPage/Admin/AdminDashboard'
import VotersOverview from '../Component/Voters/VotersComponent/VotersOverview'
import VerifyVotersAccount from '../Component/Voters/VotersComponent/VerifyVotersAccount'
import Voting from '../Component/Voters/VotersComponent/Voting'
import Candidates from '../Component/Voters/VotersComponent/Candidates'
import Result from '../Component/Voters/VotersComponent/Result'
import About from '../Component/Voters/VotersComponent/About'
import DocumentPage from '../Component/FrontPage/DocumentPage'


const MainRoutes:React.FC<{}>=():JSX.Element=>{
    const {
        registered,
        authenticated,
        verifyCode,
        credential,
        urlID,
        secret,
        title,
        redirect
    }:UserContext = React.useContext(userContext)

      if(registered && !verifyCode  && !credential && !authenticated && !secret){
        return (
            <Routes>
            <Route  path='/' element={<VirifyClient/>}/>
            <Route  path='/resend' element={<ResendCode />}/>
            <Route  path='/removeVerify' element={<RemoveNotVerifyAccount/>}/>
            <Route  path='*' element={<PageNotFound name='Virify Account' redirect='/'/>}/>
         </Routes>
        )
      }
      
      if(registered && verifyCode  && !credential && !authenticated && !secret){
        return (
            <Routes>
            <Route  path='/' element={<FormDetails/>}/>
            <Route path="/capture" element={<CaptureUser backUrl="/" cancelUrl="/capture" saveUrl="/" />} />
            <Route  path='*' element={<PageNotFound name='Account Details' redirect='/'/>}/>
         </Routes>
        )
      }

      if(registered && verifyCode  && credential && secret && !redirect && !authenticated  && !urlID){
        return (
          <Routes>
            <Route  path='/' element={<VerifySecret/>}/>
            <Route  path='*' element={<PageNotFound name='verify your secret' redirect='/'/>}/>
         </Routes>
        )
      }
      
      if(registered && verifyCode  && credential && redirect && !authenticated && !urlID){
        return (
          <Routes>
            <Route  path='/' element={<UserAuthenticated/>}/>
            <Route  path='*' element={<PageNotFound name='Progress' redirect='/'/>}/>
         </Routes>
        )
      }

      if(registered && verifyCode  && credential && authenticated  && urlID && title === 'voter' && !secret){
        return (
            <Routes>
            <Route  path='/s/:id' element={<VotersDashBoard><VotersOverview /></VotersDashBoard>}/>
            <Route  path='/s/:id/verify' element={<VotersDashBoard><VerifyVotersAccount/></VotersDashBoard>}/>
            <Route  path='/s/:id/vote' element={<VotersDashBoard><Voting/></VotersDashBoard>}/>
            <Route  path='/s/:id/candidites' element={<VotersDashBoard><Candidates /></VotersDashBoard>}/>
            <Route  path='/s/:id/result' element={<VotersDashBoard><Result/></VotersDashBoard>}/>
            <Route  path='/s/:id/about' element={<VotersDashBoard><About/></VotersDashBoard>}/>
            <Route  path='*' element={<PageNotFound name='Your Dashboard' redirect={`/s/${urlID}`}/>}/>
         </Routes>
        )
      }

      if(registered && verifyCode  && credential && authenticated  && urlID && title === 'employee' && secret){
        return (
            <Routes>
            <Route  path='/s/:id' element={<EmployeeDashboard/>}/>
            <Route  path='*' element={<PageNotFound name='Your Dashboard' redirect={`/s/${urlID}`}/>}/>
         </Routes>
        )
      }

      if(registered && verifyCode  && credential && authenticated  && urlID && title === 'admin' && secret){
        return (
            <Routes>
            <Route  path='/s/:id' element={<AdminDashboard/>}/>
            <Route  path='*' element={<PageNotFound name='Your Dashboard' redirect={`/s/${urlID}`}/>}/>
         </Routes>
        )
      }
   
   
    return (
        <Routes>
            <Route  path='/' element={<HomePage/>}/>
            <Route  path='/document' element={<DocumentPage/>}/>
            <Route  path='/contact' element={<ContactPage />}/>
            <Route  path='/signin' element={<Signin />}/>
            <Route  path='/signup' element={<Signup />}/>
            <Route  path='*' element={<PageNotFound name='Home' redirect='/'/>}/>
        </Routes>
    )
}

export default MainRoutes