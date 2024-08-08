import React, { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import { Link,  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmailAction } from '../actions/authActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { VALIDATE_EMAIL_RESET } from '../constants/authConstants';

export const ValidateEmailScreen = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const endpoint = window.location.pathname.split('/')[2]

    const validateEmail = useSelector(state => state.validateEmail);
    const { loading, error, information } = validateEmail

    const validateHandler = (e) => {
        e.preventDefault();
        dispatch(validateEmailAction(email,endpoint))
    }

    useEffect(() => {
        if(information && information.success){
            setTimeout(() => {
                dispatch({ 
                    type:VALIDATE_EMAIL_RESET
                 })
                navigate(`/enterPassword/${endpoint}/${email}/${information.collectionId}/${endpoint==="register" ? name : ""}`)
            },2500)
        }
    },[endpoint, information, navigate,email, name, dispatch])

    return (
        <>
            {error && <Message variant="error" message={error} />}
            {information && information.success && <Message variant="success" message={information.message} />}
            {loading 
            ? <Loader /> 
            : <Form onSubmit={validateHandler} className='formcomponent mx-auto mt-5'>
                <ListGroup className='card p-3' style={{ borderRadius:'10px', backgroundColor:'#f1f1f1' }}>
                    <ListGroup.Item className='border-0' style={{ backgroundColor:'#f1f1f1' }}>
                        <h5 className='d-flex' style={{ alignItems:'center' }}>
                            <LockIcon className='mr-2'/>
                            <div>Validate Email</div>
                        </h5>
                        {endpoint==="login" 
                        ?   <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                                Validate the email to proceed and enter the graphical password for <b>logging in</b>
                            </p>
                        :   <p style={{ fontSize:'0.85rem', fontWeight:'400' }} className='mb-0 pb-0 mt-3'>
                                Validate the email to proceed and set the graphical password for <b>signing up</b>
                            </p>
                        }
                    </ListGroup.Item>
                    {endpoint==="register" && <ListGroup.Item className='border-0' style={{ backgroundColor:'#f1f1f1' }}>
                        <Form.Group>
                            <Form.Label>Name<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                            <Form.Control style={{ backgroundColor:'#f1f1f1' }} autoFocus={true} required value={name} type="text" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </ListGroup.Item>}
                    <ListGroup.Item className='border-0' style={{ backgroundColor:'#f1f1f1' }}>
                        <Form.Group>
                            <Form.Label>Email<span style={{ color:'var(--error)' }} className='ml-1'>*</span></Form.Label>
                            <Form.Control style={{ backgroundColor:'#f1f1f1' }} autoFocus={true} required value={email} type="email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 mt-0" style={{ backgroundColor:'#f1f1f1' }}>
                        <Button className='w-100' variant='contained' type="submit">Validate Email</Button>
                        {endpoint==="login" 
                        ? <div className='mt-3'>
                            <small style={{ fontSize:'14px' }}>
                                New to this portal, <Link to='/validate/register'>sign up</Link> instead?
                            </small>
                        </div>
                        : <div className='mt-3'>
                            <small style={{ fontSize:'14px' }}>
                                Already a member <Link to='/validate/login'>sign in</Link> instead?
                            </small>
                        </div>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Form>
            }
        </>
    )
}
