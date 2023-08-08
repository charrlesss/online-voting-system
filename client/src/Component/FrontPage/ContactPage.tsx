import React from 'react'
import Contact from './Contact'
import HeaderBar from './HeaderBar'

const ContactPage:React.FC = ():JSX.Element=>{

    return(
        <div>
             <HeaderBar
             option={{ background:'white'}}
             listOption ={{color:'#1a237e'}}
             readShadow={true}
            />
            <Contact />
        </div>
    )
}

export default ContactPage