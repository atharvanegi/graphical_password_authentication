import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LIST_IMAGES_RESET } from '../constants/imageConstants';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'

export const HomeScreen = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ 
      type:LIST_IMAGES_RESET
     })
  },[dispatch])

  return (
    <div className="homescreen mb-5">
      <div className='d-flex divshome' style={{ alignItems:'center', justifyContent: 'space-between'}}>
        <div style={{ flex:0.4 }}>
          <img src="./images/one.png" width={"100%"} alt="fsdjbfkjsd"/>
        </div>
        <div style={{ flex:0.55 }}>
          <Typography className='typo'>
            Secure Access to your Application
          </Typography>
          <Typography className='typo mb-2'>
            With {" "}
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>Graphical </span> 
            <span style={{ color:'rgb(255,71,110)' }}>Password </span>  
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>Authentication</span> 
          </Typography>
          <Typography style={{ lineHeight:'31px', letterSpacing:'0.6px' }}>
            Passwords are ubiquitous today on any platform, on possibly any website.
            Remembering numerous passwords from various different sites can be difficult
            for a user.
            Graphical password authentication is considered the safest authentication pattern. 
            Try the all new GPA for a new experience of setting the sequence of images as your Password <Link style={{ color:"rgb(97,98,246)", textDecoration:'underline' }} to="/validate/register">here</Link>
          </Typography>
        </div>
      </div>
      <div className='d-flex divshome two py-5 mb-5' style={{ alignItems:'center', justifyContent: 'space-between'}}>
        <div style={{ flex:0.55 }} className="twoc1">
          <Typography className='typo'>
            Completely Responsive UI
          </Typography>
          <Typography className='typo mb-2'>
            For a better {" "}
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>User </span> 
            <span style={{ color:'rgb(255,71,110)' }}>Experience </span>  
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>{"{ "}UI/UX{" }"}</span> 
          </Typography>
          <Typography as="body1" style={{ lineHeight:'31px', letterSpacing:'0.6px' }}>
            The application or portal we have created here is completely responsive be it any device,
            a mobile or a desktop or a tab.
          </Typography>
          <br/>
          <Typography as="body1" style={{ lineHeight:'31px', letterSpacing:'0.6px' }}>
            A smooth workflow even when using the application and shrinking the window size.
          </Typography>
          <br/>
          <Typography as="body1" style={{ lineHeight:'31px', letterSpacing:'0.6px' }}>
            Don't believe it, give it a try!!
          </Typography>
        </div>
        <div style={{ flex:0.4 }}>
          <img src="./images/two.svg" width={"100%"} alt="fsdjbfkjsd"/>
        </div>
      </div>
      <div className='d-flex divshome pt-5' style={{ alignItems:'center', justifyContent: 'space-between'}}>
        <div style={{ flex:0.4 }} className='mr-2'>
          <img src="./images/three.png" width={"100%"} alt="fsdjbfkjsd"/>
        </div>
        <div style={{ flex:0.55 }}>
          <Typography className='typo'>
            A Problem Statement
          </Typography>
          <Typography className='typo mb-2'>
            taken from {" "}
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>Smart </span> 
            <span style={{ color:'rgb(255,71,110)' }}>India </span>  
            <span style={{ color:"rgb(97,98,246)", fontWeight:400 }}>Hackathon </span>
            <span style={{ color:'rgb(255,71,110)' }}>2022 </span> 
          </Typography>
          <Typography style={{ lineHeight:'31px', letterSpacing:'0.6px' }}>
            The problem statement we have worked on, on this project is taken from the Smart India Hackathon 2022 version, which was provided by
            the AICTE (All India Council for Technical Education), for creating such a solution which will recognize the sequence of images as the password and not the alpha numeric ones.
          </Typography>
        </div>
      </div>
    </div>
  )
}
