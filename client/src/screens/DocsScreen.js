import React from 'react'
import { Button } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';

export const DocsScreen = () => {

  const card = (cardName, icon, link, index) => {
    return(
      <div key={index} style={{ alignItems:'center', border:'1px solid lightgray', borderRadius:'15px' }} className={`${cardName} d-flex px-3 py-3 my-3`}>
        {icon}
        <div className='ml-3'>{cardName}</div>
        <a href={link} className='ml-auto' target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", color:'white', fontWeight:400 }}>
          <Button variant='contained'>
            Open
          </Button>
        </a>
      </div>
    )
  }

  const items = [
    {
      name:"Synopsis",
      icon:<ArticleOutlinedIcon style={{ fontSize:30 }} />,
      link:"https://firebasestorage.googleapis.com/v0/b/pocket-keeper-4e1c2.appspot.com/o/Synopsis_19C7002_19C7012.pdf?alt=media&token=987516cb-d6fc-457b-a8a5-87a8095acd17",
    },
    {
      name:"Software Requirement Specification",
      icon:<ArticleOutlinedIcon style={{ fontSize:30 }} />,
      link:"https://firebasestorage.googleapis.com/v0/b/pocket-keeper-4e1c2.appspot.com/o/SRS_19C7002_19C7012.pdf?alt=media&token=620a0b71-3522-4313-9bf3-eb2a25c04f04",
    },
    {
      name:"Software Design Specification",
      icon:<ArticleOutlinedIcon style={{ fontSize:30 }} />,
      link:"https://firebasestorage.googleapis.com/v0/b/pocket-keeper-4e1c2.appspot.com/o/SDS_19C7002_19C7012.pdf?alt=media&token=c2e89324-5285-4991-b244-6153e7fe9637",
    },
    {
      name:"Project Report",
      icon:<ArticleOutlinedIcon style={{ fontSize:30 }} />,
      link:"https://firebasestorage.googleapis.com/v0/b/pocket-keeper-4e1c2.appspot.com/o/Project_report_19C7002_19C7012%20(Autosaved).pdf?alt=media&token=7615a7ae-828e-46b8-9765-2c992d2f6727",
    },
    {
      name:"Presentation",
      icon:<SlideshowIcon style={{ fontSize:30 }} />,
      link:"https://firebasestorage.googleapis.com/v0/b/pocket-keeper-4e1c2.appspot.com/o/GRAPHICAL%20PASSWORD%20AUTHENTICATION.pdf?alt=media&token=02190564-611c-408c-9ca9-1f763c2cbbe4",
    },
    {
      name:"API Documentation",
      icon:<img src="./images/api.png" alt="api icon" style={{ width:30 }} />,
      link:"https://documenter.getpostman.com/view/14032941/2s8YmULfBp"
    }
  ]

  return (
    <div className="docsScreen" style={{ flexWrap:'wrap' }}>
      <h5 className='my-3'>Documents related to this project</h5>
      <div className='mt-3'>
        {items.map((each,index) => (
          card(each.name, each.icon, each.link, index)
        ))}
      </div>
    </div>
  )
}
