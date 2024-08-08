import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, ListGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { makeContactAction } from '../actions/contactActions'

export const ContactScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const loginUser = useSelector(state => state.loginUser)
    const { userInfo } = loginUser

    const makeContact = useSelector(state => state.makeContact)
    const { loading, error, message:messageResponse } = makeContact

    useEffect(() => {
        if(userInfo){
            setName(userInfo?.name)
            setEmail(userInfo?.email)
        }
        if(messageResponse){
            setTimeout(() => {
                navigate('/')
            },2500)
        }
    },[userInfo, navigate, messageResponse])

    const contactHandler = (e) => {
        e.preventDefault()
        dispatch(makeContactAction(name,email,message))
    }

    return (
        <>
          {error && <Message variant="error" message={error} />}
          {messageResponse && <Message variant='success' message="Contact placed successfully!" />}
          {loading 
          ? <Loader/> 
          : <Form onSubmit={contactHandler} className='formcomponent mx-auto mt-5'>
              <ListGroup className='card pb-2' style={{ borderRadius:'10px', backgroundColor:'#f1f1f1' }}>
                  <ListGroup.Item style={{ backgroundColor:'#f1f1f1' }} className='border-0 d-flex align-items-center'>
                    <div className='mb-1 h4'>Contact Us </div>                 
                    <div className='mb-3 ml-2 h2 wave'>&#128075;</div> 
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor:'#f1f1f1' }} className='border-0'>
                      <Form.Group>
                          <Form.Label>Name<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control autoFocus={name!=="" ? false : true} style={{ backgroundColor:'#f1f1f1' }} required value={name} onChange={e => setName(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor:'#f1f1f1' }} className='border-0'>
                      <Form.Group>
                          <Form.Label>Email<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control style={{ backgroundColor:'#f1f1f1' }} required value={email} onChange={e => setEmail(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor:'#f1f1f1' }} className='border-0'>
                      <Form.Group>
                          <Form.Label>Message<span className='ml-1' style={{ color:'var(--error)' }}>*</span></Form.Label>
                          <Form.Control style={{ backgroundColor:'#f1f1f1' }} autoFocus={name!=="" ? true : false} required as="textarea" rows={6} value={message} onChange={e => setMessage(e.target.value)} />
                      </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor:'#f1f1f1' }} className='border-0'>
                      <Button type="submit" variant="contained" color="primary" className="w-100">Send</Button>
                  </ListGroup.Item>
              </ListGroup>
            </Form>
            }  
        </>
    )
}