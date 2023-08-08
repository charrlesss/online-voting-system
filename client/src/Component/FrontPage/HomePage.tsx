import React from 'react'
import FrontContent from './FrontContent';
import HeaderBar from './HeaderBar';


const HomePage:React.FC<{}>=():JSX.Element=> {
    return (
        <>
          <HeaderBar readShadow={true}/>
          <FrontContent />
        </>
      );
}

export default HomePage

