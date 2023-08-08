
import React from "react";
import {Call ,LockOpen } from '@mui/icons-material'
import {Button ,Toolbar ,AppBar ,Grid} from "@mui/material";
import Home from "@mui/icons-material/Home";
import CreateIcon from '@mui/icons-material/Create';
import CSS from 'csstype'
import useScrollPage from '../../CustomHooks/useScroll'
import {useLocation} from 'react-router-dom'
import ArticleIcon from '@mui/icons-material/Article';
interface HeaderProps {
    option?:CSS.Properties,
    listOption?:CSS.Properties,
     readShadow?:boolean
}
interface HeaderDataTypes{
  Icon:(list:(CSS.Properties | null))=>React.ReactElement
  name:string,
  url:string
}

const HeaderData:HeaderDataTypes[] = [
  {
    Icon:(list)=><Home style={{...list}}/>,
    name:'home',
    url:'/'
  },
  {
    Icon:(list)=><ArticleIcon style={{...list}}/>,
    name:'document',
    url:'/document'
  },
  {
    Icon:(list)=><Call style={{...list}}/>,
    name:'contact',
    url:'/contact'
  },
  {
    Icon:(list)=><LockOpen style={{...list}}/>, 
    name:'sign-in',
    url:'/signin'
  },
  {
    Icon:(list)=><CreateIcon style={{...list}}/>,
    name:'sign-up',
    url:'/signup'
  },

]



const HeaderBar:React.FC<HeaderProps>=({readShadow = false ,option ,listOption}):JSX.Element=>{
  const {isScroll} = useScrollPage()
  const location = useLocation()
  const list:CSS.Properties = {
    textDecoration: "none",
    color:isScroll ? "#1a237e" :"white",
    ...listOption
  };

  return (
    <AppBar style={{ 
        boxShadow: !readShadow ? "none" : '',
        background:isScroll ? "white" : "transparent",
        ...option
        }}
        >
      <Toolbar
        style={{
          paddingRight: "50px",
        }}
      >
        <img
          src="OVS_L.png"
          style={{ width: "150px", height: "150px",position:'absolute' }}
          alt="for better"
        />
        <Grid 
            container
            justifyContent='flex-end'
            alignItems='center'
            spacing={1}
        >
          {
            HeaderData.map(({name,Icon ,url}:HeaderDataTypes,idx:number)=>{
              return (
                <Grid item key={idx}>
                    <Button
                    size="small"
                    startIcon={Icon(list)}
                    variant={location.pathname === url ? 'outlined' : 'text'}
                    color ={location.pathname !== '/' ? "primary" :isScroll ? "primary" : "secondary" }
                    style={{
                      color:isScroll ? "#1a237e" :"white",
                      ...listOption
                    }}
                    href={`${url}`}
                    >
                      {name}
                    </Button>
                </Grid>
              )
            })
          }
         
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar


