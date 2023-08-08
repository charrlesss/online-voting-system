import React from 'react'


export default function useCountDown(){

    const [counter , setCount] = React.useState<number>(parseInt(window.localStorage.getItem('timerStart') as any))
    const [disable , setDisable] = React.useState<string | null>( window.localStorage.getItem('disable') || null)


  

  React.useEffect(()=>{
 
    
    let count:any = window.localStorage.getItem('timerStart')
    let setCounting = parseInt(count)

    function timeout():any{ 

      const mytimeout = setTimeout(timeout ,1000)
      window.localStorage.setItem('timerStart',`${counter}`)
      window.localStorage.setItem('timeend',`${setCounting}`)
      const getCounting:any = window.localStorage.getItem('timeend')
      window.localStorage.setItem('timerStart',getCounting)
      setCount(setCounting)

        if(setCounting > 0){
          setCounting--
        }

        if( window.localStorage.getItem('timeend') === '0'){
          window.localStorage.setItem('disable','true')
          setDisable(window.localStorage.getItem('disable'))
          return mytimeout
        }
     
    
    }

    if(disable){
      return ()=>{
        clearTimeout(timeout())
      }
    }else{
      timeout() 
    } 

  },[disable,counter])

  
    return{
        counter,
        disable,
    }
}