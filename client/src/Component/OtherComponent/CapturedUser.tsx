
import { Box, Button } from '@material-ui/core'
import React from 'react'
import {v4 as uuidv4} from 'uuid'


interface PropsCaptureUser{
    backUrl?:(string | undefined)
    cancelUrl?:(string | undefined)
    saveUrl?:(string | undefined)
}

 const CaptureUser:React.FC<PropsCaptureUser> =({backUrl = '' , cancelUrl='' ,saveUrl =''}):JSX.Element=> {
    const [context , setContext] = React.useState<any>(null)
    const [isCapture , setIsCapture] = React.useState<string | null>(window.localStorage.getItem('capture'))
  
    React.useEffect(()=>{
        window.localStorage.removeItem('capture')
    })
   
    React.useEffect(() => {
        navigator.mediaDevices.getUserMedia({
          audio:true,
          video:{
            width:350 ,height:350
          }
        })
        .then(stream =>{
          const videoTag:any = document.getElementById('webcam')
          videoTag.srcObject = stream;
        })
        .catch(err =>{
          console.log(err)
        })
    
      },[]);
    
      React.useEffect(()=>{
        const canvas:any = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const video = document.getElementById('webcam')
        setContext({ctx ,canvas ,video})
      },[])

      function capture(){
         context.ctx.drawImage(context.video, 0, 0, context.canvas.width, context.canvas.height);
         context.canvas.classList.add('blink')
         window.localStorage.setItem('capture' , `${uuidv4()}`)
          setIsCapture(window.localStorage.getItem('capture'))
      }

      function cancel(){
        window.localStorage.removeItem('capture')
        setIsCapture('')
        window.location.href = cancelUrl
      }

      function saveImage(){
          const image_data_url = context.canvas.toDataURL('image/jpeg');
          downloadImage(image_data_url)
          setIsCapture('')
          window.location.href = saveUrl
    }

    function downloadImage(data:any, filename = `${uuidv4()}.jpeg`) {
        window.localStorage.setItem('image' , `${filename}`)
        const container:any = document.getElementById('container')
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        container.appendChild(a);
        a.click();
    }

  return (
   <Box id='container'>
       <Box>
        
        <video id="webcam" autoPlay={true}  style={{display:isCapture ? 'none' : 'block'}} ></video>
        <canvas id="canvas" width='350px' height='350px'  style={{display:!isCapture ? 'none' :'block'}}></canvas>
            {
                isCapture ?
                <Box>
                    <Button  type='button' color='primary' variant='contained' onClick={saveImage}>
                        Save
                    </Button>
                    <Button  type='button' color='secondary' variant='contained' onClick={cancel}>
                        Cancel
                    </Button>
                </Box> :
                <Box>
                <Button type='button'  variant='contained' onClick={capture}>
                    Take Photo
                </Button>
                <Button type='button'  variant='contained' onClick={()=>{
                     window.location.href = backUrl
                }}>
                    Back
                </Button>
                </Box>
            }
       </Box>
   </Box>
  )
}


export default CaptureUser